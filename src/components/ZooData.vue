<template>
  <div class="zoo-data">
    <div class="cnt">
        <b-button
          @click="isAddGenusModalActive=true"
          type="is-dark"
          size="is-small"
          icon-left="plus">
          Add Genus
        </b-button>
    </div>
    
    <section class="main">
      <div v-for="genus in genusList" :key="genus.scientific_name" class="genus-row">
        <div class="genus-column cnt">
            <box color="is-link">
              <template v-slot:name>{{genus.scientific_name}}</template>
              <template v-slot:button>
                <b-button type="is-link" size="is-small" icon-left="plus" @click="openSpeciesModal(genus.id)">
                  New Species
                </b-button>
              </template>
            </box>
        </div>
        <div class="species-list">
          <div class="species" v-for="species in speciesList.filter(s => s.genus_id == genus.id)" :key="species.common_name">
            <div class="species-info cnt">
              <box color="is-link">
                <template v-slot:name>{{species.common_name}}</template>
                <template v-slot:button>
                  <b-button type="is-info" size="is-small" icon-left="plus" @click="openSpecimenModal(species.id)">
                    New Specimen
                  </b-button>
                </template>
              </box>
            </div>
            <div class="specimen-list">
              <div class="specimen cnt" v-for="specimen in specimenList.filter(s => s.species_id == species.id)" :key="specimen.name">
                <box color="is-link">
                  <template v-slot:name>{{specimen.name}}</template>
                </box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <b-modal :active.sync="isAddGenusModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal>
      <AddGenusForm @submit="fetchAllGenuses"></AddGenusForm>
    </b-modal>

    <b-modal :active.sync="isAddSpeciesModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal>
      <AddSpeciesForm :genusId='genusId' @submit="fetchAllSpecies"></AddSpeciesForm>
    </b-modal>

    <b-modal :active.sync="isAddGSpecimenModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal>
      <AddSpecimenForm :speciesId='speciesId' @submit="fetchAllSpecimen"></AddSpecimenForm>
    </b-modal>

  </div>
</template>

<script>
import box from '@/components/box.vue'
import AddGenusForm from '@/components/AddGenusForm.vue'
import AddSpeciesForm from '@/components/AddSpeciesForm.vue'
import AddSpecimenForm from '@/components/AddSpecimenForm.vue'
export default {
  name: 'ZooData',
  components: {
    box,
    AddGenusForm,
    AddSpeciesForm,
    AddSpecimenForm
  },
  data() {
    return {
      isAddGenusModalActive: false,
      isAddSpeciesModalActive: false,
      isAddGSpecimenModalActive: false,
      genusId: null,
      speciesId: null,
      genusList: [],
      speciesList: [],
      specimenList: []
    }
  },
  methods: {
    openSpeciesModal(id) {
      this.isAddSpeciesModalActive = true;
      this.genusId = id;
    },
    openSpecimenModal(id) {
      this.isAddGSpecimenModalActive = true;
      this.speciesId = id;
    },
    fetchAllGenuses() {
      fetch('http://localhost:5000/genus/all')
      .then(response => response.json())
      .then(json => this.genusList = json)
      .catch(e => {
        return this.$buefy.toast.open({
          duration: 5000,
          message: `Error fetching the database: ${e.message}`,
          position: 'is-top',
          type: 'is-danger'
        })
      })
    },
    fetchAllSpecies() {
      fetch('http://localhost:5000/species/all')
      .then(response => response.json())
      .then(json => this.speciesList = json)
      .catch(e => {
        return this.$buefy.toast.open({
          duration: 5000,
          message: `Error fetching the database: ${e.message}`,
          position: 'is-top',
          type: 'is-danger'
        })
      })
    },
    fetchAllSpecimen() {
      fetch('http://localhost:5000/specimen/all')
      .then(response => response.json())
      .then(json => this.specimenList = json)
      .catch(e => {
        return this.$buefy.toast.open({
          duration: 5000,
          message: `Error fetching the database: ${e.message}`,
          position: 'is-top',
          type: 'is-danger'
        })
      })
    },
    fetchAll() {
      // fetching eveything of everything
      this.fetchAllGenuses();
      this.fetchAllSpecies();
      this.fetchAllSpecimen();
    }
  },
  created() {
    this.fetchAll();
  }
};
</script>

<style scoped lang="scss">
.zoo-data {
  width: 65%;
  padding: 20px;
  margin: 0 auto; 
  background: #f4f6ff;
}
.cnt {
  margin: 5px;
}
.genus-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid lightgrey;
  
  .genus-column {
    width: 30%;
  }
  .species-list {
    flex-grow: 1;
    .species {
      display: flex;
      justify-content: space-between;
      
      .species-info {
        width: 50%;
      }
      .specimen-list {
        flex-grow: 1;
      }
    }
  }
}
</style>
