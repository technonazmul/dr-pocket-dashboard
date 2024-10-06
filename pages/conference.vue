<template>
  <div>
    <h1>Jitsi Meet Conference</h1>
    <div id="jitsi-container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initJitsi();
  },
  methods: {
    initJitsi() {
      const domain = "meet.jit.si";
      const options = {
        roomName: "YourRoomNameHere", // Generate dynamic room names if needed
        parentNode: document.querySelector("#jitsi-container"),
        width: "100%",
        height: "600px",
      };
      const api = new JitsiMeetExternalAPI(domain, options);

      // Optional: Add event listeners
      api.addEventListener("participantJoined", (event) => {
        console.log("Participant joined:", event);
      });
    },
  },
};
</script>

<style scoped>
#jitsi-container {
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
}
</style>
