<template>
        <div class="container pt-3" v-if="this.user">
            <!-- <span v-if="this.user"> -->
            <form @submit.prevent="onFormSubmit">
                <h3 class="col-md-12 text-center pb-3">Add Location</h3>
                <div class="form-group col-md-6 d-inline-block">
                    <label>Name of your location</label>
                    <input type="text" class="form-control" v-model="surface.name" required>
                </div>

                <div class="form-group col-md-6 d-inline-block">
                    <label>City</label>
                    <input type="text" class="form-control " v-model="surface.city" required>
                </div>

                <div class="form-group col-md-12 d-inline-block">
                    <label>Address</label>
                    <input type="text" class="form-control" v-model="surface.address" required>
                </div>
 
                <div class="form-group col-md-12 d-inline-block">
                    <label>Information</label>
                    <input type="text" class="form-control" v-model="surface.information" required>
                </div>

                <!-- <div class="form-group col-md-12 d-inline-block">
                    <label>Created By</label>
                    <input type="text" class="form-control" v-model="surface.creatorName" required>
                </div> -->

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
                                :balloon-template="mapBalloon(this.surface,this.user)"
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
            <div v-else style="height:100vh">
            </div>
</template>

<script>
    import { db } from '../firebaseDb';
    import firebase from 'firebase/app';
    import 'firebase/firestore';

    export default {
        name: 'SurfaceCreate',
        data() {
            return {
                surface: { 
                    creatorName: "Not Registered",
                },
                user: null,
                coords: [43.078560, 25.627159]
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
        },
        methods: {
            onFormSubmit(event) {
                if(this.surface.coords === undefined){
                    alert("Please choose a location by clikcing on the map");
                }
                else{
                this.surface.creatorName = this.user.displayName;
                event.preventDefault()
                db.collection('surfaces').add(this.surface).then(() => {
                    alert("Surface successfully created!");
                    this.surface.address = ''
                    this.surface.city = ''
                    this.surface.coords = ''
                    this.surface.name =''
                    this.surface.information = ''
                });
                }
            },
            getCoords(event){
                    let currentClick = event.get('coords');
                    this.surface.coords = currentClick.toString();
                    this.$forceUpdate();
              },
            mapBalloon: function(surface,user) {
                if(surface.city === undefined || surface.address === undefined || surface.name === undefined || surface.information == undefined)
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
                <p><strong>Information:</strong>: ${surface.information}</p>
                <p><strong>Created by:</strong>: ${user.displayName}</p>
                </div>
                `;
                }
        }
  }
</script>