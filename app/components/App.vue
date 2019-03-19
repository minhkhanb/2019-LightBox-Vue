<template>
  <Page class="page" actionBarHidden="true">
    <ScrollView>
      <AbsoluteLayout width="100%" height="100%">
        <Label text="Loading..." textWrap="true" />
      </AbsoluteLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
  import Login from './Login/Login.vue';
  import { ApiService } from '../services/api/service';
  import { API_URL } from '../services/api/endpoints';

  export default {
    data() {
      return {
        
      }
    },
    components: {
      Login
    },
    methods: {
      getRepos() {
        const api = new ApiService();
        api.request('get', API_URL.REPOS).then(res => {
          console.log('res in app.vue: ', res);
        });
        
      }
    }
  }
</script>
