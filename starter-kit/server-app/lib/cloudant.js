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
let db_name = "test1";

/**
 * Connects to the Cloudant DB
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
                console.log('Connect failure: ' + err.message + ' for Cloudant DB: ' +
                    cloudant_id);
                reject(err);
            } else {
                let db = cloudant.use(db_name);
                console.log('Connect success! Connected to DB: ' + db_name);
                resolve(db);
            }
        }));
    });
}

// Initialize the DB when this module is loaded
(function getDbConnection() {
    console.log('Initializing Cloudant connection...', 'items-dao-cloudant.getDbConnection()');
    dbCloudantConnect().then((database) => {
        console.log('Cloudant connection initialized.', 'items-dao-cloudant.getDbConnection()');
        db = database;
    }).catch((err) => {
        console.log('Error while initializing DB: ' + err.message, 'items-dao-cloudant.getDbConnection()');
        throw err;
    });
})();

const dbCloudantConnect2 = () => {
    return new Promise((list, reject) => {
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
                    list(body)
                    body.forEach((db) => {
                      console.log(db);
                    });
                }).catch((err) => { console.log(err); reject(err); });
            }
        }));
    });
}

/**
 * Find all Items objects that match the specified
 * partial description.
 * 
 * @param {String} partialDescription
 * 
 * @return {Promise} Promise - 
 *  resolve(): all Item objects that contain the partial
 *          description provided or an empty array if nothing
 *          could not be located for that partialDescription 
 *  reject(): the err object from the underlying data store
 */
function findByDescription(partialDescription) {
    return new Promise((resolve, reject) => {
        let search = `.*${partialDescription}.*`;
        db.find({ 
            'selector': { 
                'description': {
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
 * Create an entry with the specified description
 * 
 * @param {String} description - the description to use
 * @param {String} quantity - the quantity available 
 * @param {String} location - the GPS location of the item
 * @param {String} contact - the contact info 
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function create(description, location) {
    return new Promise((resolve, reject) => {
        let listId = uuidv4();
        let whenCreated = Date.now();
        let list = {
            _id: listId,
            id: listId,
            type: 'Supplies',
            description: description,
            quantity: quantity,
            location: location,
            contact: contact,
            whenCreated: whenCreated
        };
        db.insert(list, (err, result) => {
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
    findByDescription: findByDescription,
    create: create
  };