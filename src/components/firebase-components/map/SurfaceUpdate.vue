<template>
    <div class="row justify-content-center pt-3">
        <div class="col-6">
            <h3 class="text-center">Update Location</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group col-md-6 d-inline-block">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="surface.name" required>
                </div>
                <div class="form-group col-md-6 d-inline-block">
                    <label>Address</label>
                    <input type="text" class="form-control" v-model="surface.address" required>
                </div>
                <div class="form-group col-md-12 d-inline-block">
                    <label>City</label>
                    <input type="text" class="form-control" v-model="surface.city" required>
                </div>
                <div class="form-group col-md-12 d-inline-block">
                    <label>Information</label>
                    <input type="text" class="form-control" v-model="surface.information" required>
                </div>
                <div class="form-group col-md-12 d-inline-block">
                    <label>Coordinates: <small>{{surface.coords}}</small></label>
                    <yandex-map
                        zoom="15"
                        v-on:click="getCoords"
                        map-type="satellite"
                        scroll-zoom="false"
                        style="width: 100%; height: 50vh"
                        :coords="coords"
                        >
                            <ymap-marker
                                v-if="this.surface.coords !== undefined" 
                                marker-id="1" 
                                :balloon-template="mapBalloon(this.surface)"
                                :coords="surface.coords.split(',')"
                                :icon="{content: this.surface.name}"
                                />
                    </yandex-map>
                </div>
                <div class="form-group d-flex justify-content-center">
                    <button class="btn btn-primary rounded btn-block w-25">Add Location</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { db } from '../firebaseDb';
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    export default {
        data() {
            return {
                
                surface: {
                },
                coords: [43.078560, 25.627159],
                user: null
            }
        },
        created() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.user = user;
                } else {
                    this.user = null;
                }
                });

            let dbRef = db.collection('surfaces').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.surface = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                if(!this.surface.creatorName.includes(`${this.user.displayName}`)){
                this.surface.creatorName += `,${this.user.displayName}`;
                }
                event.preventDefault()
                db.collection('surfaces').doc(this.$route.params.id)
                .update(this.surface).then(() => {
                    console.log("Surfaces successfully updated!");
                    this.$router.push('/list')
                }).catch((error) => {
                    console.log(error);
                });
            },
            getCoords(event){
                    let currentClick = event.get('coords');
                    this.surface.coords = currentClick.toString();
                    this.$forceUpdate();
              },
            mapBalloon: function(surface) {
                if(surface.city === undefined || surface.address === undefined || surface.name === undefined || surface.information === undefined)
                {
                    surface.city = " ";
                    surface.address = " ";
                    surface.name  = " ";
                    surface.information = " ";
                }
                return `
                <div><h1> ${surface.name}</h1>
                <p><strong>City</strong>: ${surface.city}</p>
                <p><strong>Address</strong>: ${surface.address}</p>
                <p><strong>Information</strong>: ${surface.information}</p>
                </div>
                `;
                }
            }
    }
</script>