const router = require("express").Router();

const path = require("path");
const { isProduction, project_root } = require("../consts");

// ==================================================================================
if (!isProduction) {
  router.get("/env", (_, res) => {
    return res.json({ ...process.env });
  });

  // -----------------------------------------------------------
  // -----------------------------------------------------------

  router.post("/log", (_, res) => {
    return res.sendFile(path.join(project_root, "debug.log"));
  });

  router.get("/log", (_, res) => {
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SERVER LOG</title>
  </head>
  <body style="background-color: black; color: white">
    <div id="scroll_panel" style="position:fixed;top:10px;right:10px;padding:5px;background-color:lime;color:black;font-weight:800;">
      <div id="scroll_status">Scroll ON!</div>
      <div style="background-color:white;color:black;padding:2px;">CTRL+S to Switch</div>
    </div>
    <pre id="log" style="display: inline; margin: 0"></pre>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      let scrollable = true;  
      function updateStatusScroll(){
        const scroll_panel = document.getElementById("scroll_panel");
        scroll_panel.style.backgroundColor = scrollable ? "lime" : "red";
        scroll_panel.style.color = scrollable ? "black" : "white";
        document.getElementById("scroll_status").innerHTML = scrollable ? "Scroll ON!" : "Scroll OFF!";
      }  
      document.body.addEventListener("keydown", function(e){
        e = e || window.event;
        var key = e.which || e.keyCode; // keyCode detection
        var ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false); // ctrl detection
        if ( key == 83 && ctrl ) {
          e.preventDefault();
          scrollable = !scrollable;
          updateStatusScroll();
          localStorage.setItem("scroll", scrollable ? "true" : "false");
        }
      },false);
      function scrolling(){
        updateStatusScroll();
        if(scrollable){
          setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
          }, 200);
        }
      }
      window.onload = async () => {
        const res = await fetch("/log", {
          method: "POST",
        });
        const last_log = await res.text();
        console.log({ last_log });
        document.getElementById("log").innerHTML = last_log;

        if (!localStorage.getItem("scroll")) {
          localStorage.setItem("scroll", "true");
          scrollable = true;
          return;
        }
        scrollable = localStorage.getItem("scroll") === "true";
        if(!scrollable){
          setTimeout(()=>{
            document.body.scrollTop = document.documentElement.scrollTop = 0;
          }, 100);
        }
        //
        scrolling();
      };  

      const socket = io();
      console.log({ socket });
      socket.on("SERVER:LOG", (log) => {
        console.log({ log });
        const last_log = document.getElementById("log").innerHTML;
        document.getElementById("log").innerHTML = last_log + log;
        //
        scrolling();
      });
    </script>
  </body>
</html>`;
    return res.send(html);
  });
}

// ==================================================================================

module.exports = router;
