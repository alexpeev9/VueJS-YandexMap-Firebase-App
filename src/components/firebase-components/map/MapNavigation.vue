<template> 
      <div class="col-12 justify-content-center">
      <yandex-map
      zoom="15"
      map-type="satellite"
      style=" height: 70vh"
      :coords="coords"
      SearchControl="false"
    >
      <ymap-marker
        marker-id="1"
        v-for="(billboard, index) in surfaces"
        :balloon-template="mapBalloon(billboard)"
        :coords="billboard.coords.split(',')"
        :icon="{content: billboard.name}"
        :key="index"
      ></ymap-marker>
    </yandex-map>
    </div>
</template>
<script>
import { db } from '../firebaseDb';
import { yandexMap, ymapMarker } from "vue-yandex-maps";
export default {
  name: 'MapNavigation',
  components: { yandexMap, ymapMarker },
  data() {
    return {
      coords: [43.078560, 25.627159],
      surfaces: [],
    };
  },
  created() {
            db.collection('surfaces').onSnapshot((snapshotChange) => {
                this.surfaces = [];
                snapshotChange.forEach((doc) => {
                    this.surfaces.push({
                        id: doc.data().id,
                        name: doc.data().name,
                        address: doc.data().address,
                        city: doc.data().city,
                        information: doc.data().information,
                        creatorName: doc.data().creatorName,
                        coords: doc.data().coords,
                    })
                });
            })
        },
  methods: {
    mapBalloon: function(billboard) {
      return `
      <div><h1>${billboard.name}</h1>
      <p><strong>City</strong>: ${billboard.city}</p>
      <p><strong>Address</strong>: ${billboard.address}</p>
      <p><strong>Information</strong> ${billboard.information}</p>
      <p><strong>Created By</strong> ${billboard.creatorName}</p>
      </div>
      `;
    },
  }
};
</script>