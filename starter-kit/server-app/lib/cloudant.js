const Cloudant = require('@cloudant/cloudant');

const cloudant_id = process.env.CLOUDANT_ID || '<cloudant_id>'
const cloudant_apikey = process.env.CLOUDANT_IAM_APIKEY || '<cloudant_apikey>';

// UUID creation
const uuidv4 = require('uuid/v4');

var cloudant = new Cloudant({
    account: cloudant_id,
    plugins: {
      iamauth: {
        iamApiKey: cloudant_apikey
      }
    }
  })

// Cloudant DB reference
let db;
let db_name = "community_db";

/**
 * Connects to the Cloudant DB, creating it if does not already exist
 * @return {Promise} - when resolved, contains the db, ready to go
 */
const dbCloudantConnect = () => {
    return new Promise((resolve, reject) => {
        Cloudant({  // eslint-disable-line
            account: cloudant_id,
                plugins: {
                    iamauth: {
                        iamApiKey: cloudant_apikey
                    }
                }
        }, ((err, cloudant) => {
            if (err) {
                console.log('Connect failure: ' + err.message + ' for Cloudant ID: ' +
                    cloudant_id);
                reject(err);
            } else {
                cloudant.db.list().then((body) => {
                    if (!body.includes(db_name)) {
                        console.log('DB Does not exist..creating: ' + db_name);
                        cloudant.db.create(db_name).then(() => {
                            if (err) {
                                console.log('DB Create failure: ' + err.message + ' for Cloudant ID: ' +
                                cloudant_id);
                                reject(err);
                            }
                        })
                    }
                    let db = cloudant.use(db_name);
                    console.log('Connect success! Connected to DB: ' + db_name);
                    resolve(db);
                }).catch((err) => { console.log(err); reject(err); });
            }
        }));
    });
}

// Initialize the DB when this module is loaded
(function getDbConnection() {
    console.log('Initializing Cloudant connection...', 'getDbConnection()');
    dbCloudantConnect().then((database) => {
        console.log('Cloudant connection initialized.', 'getDbConnection()');
        db = database;
    }).catch((err) => {
        console.log('Error while initializing DB: ' + err.message, 'getDbConnection()');
        throw err;
    });
})();

/**
 * Find all objects that match the specified partial name.
 * 
 * @param {String} partialName
 * 
 * @return {Promise} Promise - 
 *  resolve(): all Item objects that contain the partial
 *          name provided or an empty array if nothing
 *          could be located for that partialName 
 *  reject(): the err object from the underlying data store
 */
function findByName(partialName) {
    return new Promise((resolve, reject) => {
        let search = `.*${partialName}.*`;
        db.find({ 
            'selector': { 
                'name': {
                    '$regex': search 
                }
            } 
        }, (err, documents) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: JSON.stringify(documents.docs), statusCode: (documents.docs.length > 0) ? 200 : 404 });
            }
        });
    });
}

/**
 * Find all objects that match the specified partial name.
 * 
 * @param {String} type
 * @param {String} partialName
 * 
 * @return {Promise} Promise - 
 *  resolve(): all Item objects that contain the partial
 *          name provided or an empty array if nothing
 *          could be located for that partialName 
 *  reject(): the err object from the underlying data store
 */
function find(type, partialName) {
    return new Promise((resolve, reject) => {
        let selector = {}
        if (type) {
            selector['type'] = type;
        }
        if (partialName) {
            let search = `(?i).*${partialName}.*`;
            selector['name'] = {'$regex': search};

        }
        console.log(selector)
        db.find({ 
            'selector': selector
        }, (err, documents) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: JSON.stringify(documents.docs), statusCode: (documents.docs.length > 0) ? 200 : 404 });
            }
        });
    });
}

/**
 * Find all objects that match a type.
 * 
 * @param {String} type
 * 
 * @return {Promise} Promise - 
 *  resolve(): all Item objects that contain the type
 *          provided or an empty array if nothing
 *          could be located for that type 
 *  reject(): the err object from the underlying data store
 */
function findByType(type) {
    return new Promise((resolve, reject) => {
        db.find({ 
            'selector': { 
                'type': type
            } 
        }, (err, documents) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: JSON.stringify(documents.docs), statusCode: (documents.docs.length > 0) ? 200 : 404 });
            }
        });
    });
}

/**
 * Create an entry with the specified description
 * 
 * @param {String} type - the type of the item
 * @param {String} name - the name of the item
 * @param {String} description - the description of the item
 * @param {String} quantity - the quantity available 
 * @param {String} location - the GPS location of the item
 * @param {String} contact - the contact info 
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function create(type, name, description, quantity, location, contact) {
    return new Promise((resolve, reject) => {
        let itemId = uuidv4();
        let whenCreated = Date.now();
        let item = {
            _id: itemId,
            id: itemId,
            type: type,
            name: name,
            description: description,
            quantity: quantity,
            location: location,
            contact: contact,
            whenCreated: whenCreated
        };
        db.insert(item, (err, result) => {
            if (err) {
                logger.error('Error occurred: ' + err.message, 'create()');
                reject(err);
            } else {
                resolve({ data: { createdId: result.id, createdRevId: result.rev }, statusCode: 201 });
            }
        });
    });
}

const dbList= () => {
    return 
}

const test = () => {
    return "hello"
}

module.exports = {
    findByName: findByName,
    create: create,
    find: find
  };