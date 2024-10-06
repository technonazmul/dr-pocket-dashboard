// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: [
    // Bootstrap
    "~/static/assets/css/bootstrap.min.css",

    // Fontawesome
    "~/static/assets/plugins/fontawesome/css/fontawesome.min.css",
    "~/static/assets/plugins/fontawesome/css/all.min.css",

    // Datatables
    "~/static/assets/plugins/datatables/datatables.min.css",

    // Feathericon
    "~/static/assets/css/feather.css",
    // Toaster
    "~/static/assets/plugins/toastr/toatr.css",

    // Main CSS
    "~/static/assets/css/style.css",
  ],
  app: {
    head: {
      script: [
        {
          src: "https://meet.jit.si/external_api.js",
          async: true,
        },
        // jQuery
        { src: "/assets/js/jquery-3.7.1.min.js", type: "text/javascript" },

        // Bootstrap Core JS
        { src: "/assets/js/bootstrap.bundle.min.js", type: "text/javascript" },

        // Feather Js
        { src: "/assets/js/feather.min.js", type: "text/javascript" },

        // Slimscroll
        { src: "/assets/js/jquery.slimscroll.js", type: "text/javascript" },

        // Select2 Js
        { src: "/assets/js/select2.min.js", type: "text/javascript" },

        // Datatables JS
        {
          src: "/assets/plugins/datatables/jquery.dataTables.min.js",
        },
        {
          src: "/assets/plugins/datatables/datatables.min.js",
        },
        // Toster
        {
          src: "/assets/plugins/toastr/toastr.min.js",
        },

        // Custom JS
        { src: "/assets/js/app.js", type: "text/javascript" },
      ],
    },
  },
});
