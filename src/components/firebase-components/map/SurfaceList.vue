<template>
        <div class="table-responsive">
            <table class="table table-striped border border-secondary">
                <thead>
                    <tr>
                        <th class="pl-5 align-middle" scope="col" >Name</th>
                        <th scope="col" class="align-middle">Address</th>
                        <th scope="col" class="align-middle">City</th>
                        <th scope="col" class="algin-middle">Information</th>
                        <th scope="col" class="align-middle">Created By:</th>
                        <th scope="col" class="align-middle">Coordinates</th>
                        <th scope="col" class="align-middle">Edit</th>
                        <th scope="col" class="align-middle">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="surface in Surfaces" :key="surface.key">
                        <th class="align-middle pl-5" scope="row">{{ surface.name }}</th>
                        <td class="align-middle">{{ surface.address }}</td>
                        <td class="align-middle">{{ surface.city }}</td>
                        <td class="align-middle">{{ surface.information }}</td>
                         <td class="align-middle">{{ surface.creatorName }}</td>
                        <td class="align-middle">
                            <yandex-map
                                zoom="15"
                                map-type="satellite"
                                scroll-zoom="false"
                                style="width: 30vh ; height: 30vh"
                                :coords="surface.coords.split(',')"
                                >
                                    <ymap-marker
                                        marker-id="1" 
                                        :balloon-template="mapBalloon(surface)"
                                        :coords="surface.coords.split(',')"
                                        :icon="{content: surface.name}"
                                        />
                            </yandex-map> 
                        </td>
                        <td class="align-middle">
                            <router-link :to="{name: 'edit', params: { id: surface.key }}" class="btn btn-success">Edit
                            </router-link>
                        </td>
                        <td class="align-middle">
                            <button @click.prevent="deleteSurface(surface.key)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>
<script>
    import { db } from '../firebaseDb';
    
    export default {
        data() {
            return {
                coords: [43.078560, 25.627159],
                Surfaces: []
            }
        },
        created() {
            db.collection('surfaces').onSnapshot((snapshotChange) => {
                this.Surfaces = [];
                snapshotChange.forEach((doc) => {
                    this.Surfaces.push({
                        key: doc.id,
                        address: doc.data().address,
                        city: doc.data().city,
                        information: doc.data().information,
                        creatorName: doc.data().creatorName,
                        coords: doc.data().coords,
                        name: doc.data().name
                    })
                });
            })
        },
        methods: {
            deleteSurface(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection("surfaces").doc(id).delete().then(() => {
                    // console.log("Document deleted!");
                })
              }
            },
            mapBalloon: function(surface) {
                return `
                <p><strong>City</strong>: ${surface.city}</p>
                <p><strong>Address</strong>: ${surface.address}</p>
                <p><strong>Information</strong>: ${surface.information}</p>
                <p><strong>Information</strong>: ${surface.creatorName}</p>
                </div>
                `;
        }
    }
    }
</script>

<style>
    .btn-primary {
        margin-right: 12px;
    }
    .table-striped > tbody > tr:nth-child(2n+1) > td, .table-striped > tbody > tr:nth-child(2n+1) > th {
   background-color: #0275d8;
    }
    @media screen and (max-width: 902px) {
    .table-responsive {
        -ms-overflow-style: scrollbar !important;
    }
}
</style>