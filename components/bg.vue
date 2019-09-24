<template lang="pug">
  img.bg.response.h-screen(:src="bgUrl" mode="aspectFill")      
</template>

<script>
export default {
  data() {
    return {
      bgUrl: "/static/common-bg.jpg"
    };
  }
};
</script>