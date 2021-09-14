import { parse } from 'fast-xml-parser';
import PouchDB from 'pouchdb-react-native';

const REMOTE = 'http://admin:0000@178.128.210.242:5981/'
const DRUGS_DB = 'drugsDb';
const ALLERGIES_DB = 'allergiesDb';
const DRUGS_DB_REMOTE = REMOTE + 'drugsdb';
const ALLERGIES_DB_REMOTE = REMOTE + 'allergiesdb';
const COMPANY_ID = 'elite38301501odv';
const DRUGS_STORAGE_KEY = 'drugs';
const ALLERGY_AGENT_STORAGE_KEY = 'allergy';
const CLINICAL_CONTENT_STORAGE_KEY = 'clinicalContent';

const baseURL = 'http://pepidknowledgebase.com/WebServices/';

const drugsDb = new PouchDB(DRUGS_DB);
const allergiesDb = new PouchDB(ALLERGIES_DB);
// const drugsDbRemote = new PouchDB(DRUGS_DB_REMOTE);
// const allergiesDbRemote = new PouchDB(ALLERGIES_DB_REMOTE);

// var opts = { live: true, retry: true };

// drugsDb.sync(drugsDbRemote, opts);
// allergiesDb.sync(allergiesDbRemote, opts);


export const refreshDB = async () => {
  const res1 = await fetch(
    baseURL + 'DIGenerator.asmx/getAllDrugsArray?strCompanyID=' + COMPANY_ID
  );
  const res2 = await fetch(
    baseURL +
      'DIGenerator.asmx/GetAllergyAgentsArray?strCompanyID=' +
      COMPANY_ID +
      '&enumAllergyAgentType=All'
  );

  // Convert response to text
  const res1Text = await res1.text();
  const res2Text = await res2.text();

  // Parse and convert to JS object
  const res1Obj = await parse(res1Text);
  const res2Obj = await parse(res2Text);

  drugsDb.bulkDocs(
    await res1Obj.ArrayOfDIGIndex.DIGIndex.map((obj) => ({
      _id: obj.DrugID.toString(),
      name: obj.DrugName,
      type: obj.DrugType,
    }))
  );

  allergiesDb.bulkDocs(
    await res2Obj.ArrayOfAllergyAgentIndex.AllergyAgentIndex.map((obj) => ({
      _id: obj.AllergyAgentID.toString(),
      name: obj.AllergyAgentName,
      type: obj.AllergyAgentType,
    }))
  );
};

export const getAllData = async () => {
  console.log(await drugsDb.allDocs());
};

export const getAllDrugsLocal = async () => {
  return await drugsDb.allDocs();
};

export const getAllDrugs = async () => {
  return fetch(
    baseURL + 'DIGenerator.asmx/getAllDrugsArray?strCompanyID=' + COMPANY_ID
  )
    .then((response) => response.text())
    .then(async (text) => {
      const obj = parse(text);
      return obj;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const getAllAllergyAgent = async () => {
  return fetch(
    baseURL +
      'DIGenerator.asmx/GetAllergyAgentsArray?strCompanyID=' +
      COMPANY_ID +
      '&enumAllergyAgentType=All'
  )
    .then((response) => response.text())
    .then(async (text) => {
      const obj = parse(text);
      console.log(obj);
      return obj;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const getClinicalContent = async (searchString) => {
  const url = `https://pepidknowledgebase.com/WebServices/content.asmx/SearchContentIndex?strCompanyID=${COMPANY_ID}&strProductCode=PLPC&strSearch=${searchString}`;

  return fetch(url)
    .then((response) => response.text())
    .then(async (text) => {
      const obj = parse(text);
      if (obj) {
        console.log(obj);
        return obj;
      } else {
        console.log(obj);
        return null;
      }
    })
    .then((contentId) => {
      if (contentId) {
        console.log('Getting clinical content from API...');
        const url1 = `https://www.pepidknowledgebase.com/WebServices/content.asmx/GetMedicalContentByCodeArray?strCompanyID=${COMPANY_ID}&strProductCode=PLPC&strCode=${contentId}&strSAB=PEPID`;

        fetch(url1)
          .then((response) => response.text())
          .then(async (text) => {
            const obj = parse(text);
            console.log(obj);
            return obj;
          })
          .catch((error) => {
            console.log(error);
            return null;
          });
      } else {
        console.log('Content Id not found');
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};
