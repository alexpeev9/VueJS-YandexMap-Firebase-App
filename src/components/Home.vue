<template>
    <main class="row">
      <map-navigation />
    </main>
</template>
<script>
import MapNavigation from '@/components/firebase-components/map/MapNavigation';

export default {
  name: 'Home',
    components:{
        'map-navigation': MapNavigation,
    },
}
</script>