(()=>{var t={7309:(t,e,s)=>{const{execSync:i}=s(3129),n={"@groupings_session_targets":"build,git","@groupings_special_session_name":"___","@groupings_special_window_name":"___","@groupings_file_system_poll_min_interval":1e3,"@groupings_file_system_poll_max_interval":15e3,"@groupings_workspace_directory":null};t.exports={getTmuxOption:t=>i(`tmux show-option -gqv ${t}`).toString().trim()||n[t]}},2462:(t,e,s)=>{const{readFileSync:i,readdirSync:n}=s(5747),{execSync:o}=s(3129),r=()=>o("tmux list-sessions -F '#{session_name}//#{session_attached}'").toString().split("\n").filter(Boolean).map((t=>t.split("//"))),l=()=>o("tmux list-windows -a -F '#{session_name}//#{session_attached}//#{window_name}//#{window_active}//#{pane_id}'").toString().split("\n").filter(Boolean).map((t=>t.split("//")));t.exports={getDirectories:t=>n(t,{withFileTypes:!0}).filter((t=>t.isDirectory())).map((t=>t.name)),getAllTmuxSessions:r,getAllTmuxSessionWindows:l,tmuxSwitch:(t,e)=>{t&&e?o(`tmux select-window -t ${t}:${e}`):e&&o("tmux select-window -t "+e),t&&o("tmux switch-client -t "+t)},getTmuxWindows:t=>l().filter((([e])=>e===t)).map((([,,t])=>t)),tmuxCreate:(t,e,s,i="")=>{const n=r().map((([t])=>t));s.forEach((s=>{n.includes(s)?o(`tmux new-window -t ${s} -n ${t} -c ${e} ${i}`):o(`tmux new-session -A -d -s ${s} -n ${t} -c ${e} ${i}`)}))},closeTmuxWindow:(t,e)=>{o(`tmux kill-window -t ${t}:${e}`)},killTmuxSession:t=>{o(`tmux kill-session -t ${t}`)},runInAlternateScreen:()=>{process.stdout.write("[?1049h"),process.on("exit",(()=>{process.stdout.write("[?1049l")}))},restoreLastTmuxSession:()=>{o("tmux switch-client -l")},throwTmuxError:t=>{o(`tmux display-message '${t}'`),process.exit(0)},applyConfig:(t,e,s,n)=>{let r;try{r=i(`${n}/.config/${t}.json`)}catch(t){}if(!r)return;const u=JSON.parse(r);e.forEach((e=>{const i=u[e];if(!i)return;const n=((t,e)=>l().filter((([s,,i])=>s===t&&i===e)).map((([,,,,t])=>t)))(e,t)[0];if(i.panes)for(let r=0;r<i.panes.length;r++)i.panes[r]&&o(`tmux send-keys -t ${e}:${t} '${i.panes[r]}' Enter`),r===i.panes.length-1?o(`tmux select-pane -t ${n}`):o(`tmux split-window -t ${n} -c ${s}`);i.layout&&o(`tmux select-layout -t ${e}:${t} ${i.layout}`)}))}}},3129:t=>{"use strict";t.exports=require("child_process")},5747:t=>{"use strict";t.exports=require("fs")}},e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={exports:{}};return t[i](n,n.exports,s),n.exports}(()=>{const{closeTmuxWindow:t,getAllTmuxSessionWindows:e}=s(2462),{getTmuxOption:i}=s(7309),n=i("@groupings_session_targets").split(","),o=e(),[r,,l]=o.find((([,t,,e])=>"1"===t&&"1"===e));n.includes(r)&&n.forEach((e=>{t(e,l)}))})()})();