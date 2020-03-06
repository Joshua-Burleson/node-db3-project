const knex = require('knex');
const dbConfig = require('../knexfile');

const masterDB = knex(dbConfig.development);


class DataTable {

    constructor(db, table){
        this.dbDefault = () => db(table);
        this.db = db;
    }

    find(){
        return this.dbDefault();
    }

    findById(id){
        return this.dbDefault()
                   .where({ id });
    }

    findSteps(id){
        return this.db('steps as steps')
                   .where({'steps.scheme_id': id})
                   .join('schemes as s', 's.id', 'steps.scheme_id' )
                   .select('steps.id', 'steps.step_number', 'steps.instructions', 's.scheme_name');
    }

    add(scheme){
        return this.dbDefault()
                   .insert(scheme)
                   .then( idArray => this.findById(idArray[0]) );
                   
    }

    addStep(step, scheme_id){
        step.scheme_id = scheme_id;
        return this.db('steps')
                   .insert(step)
                   .then( () => this.findSteps(scheme_id) );
    }

    update(updates, id){
        return this.dbDefault()
                   .where({ id })
                   .update(updates)
                   .then( () => this.findById(id));
    }

    remove(id){
        return this.dbDefault()
                   .where({ id })
                   .del();
    }

}


const Scheme = new DataTable(masterDB, 'schemes');

module.exports = Scheme;