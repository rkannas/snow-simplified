// ==UserScript==
// @name         SolExp_HSCM_HideElements_CIT_beta
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Simplied HSCM Service Now Portal For CIT Team
// @author       Rajesh Kanna S
// @match        https://itsm.services.sap/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stackoverflow.com
// @grant        none
// @run-at      document-idle
// ==/UserScript==

(function () {
    "use strict";
  
    //**********************Configuration*******************************
  
    //---------------Start Hiding Buttons---------------------
    var hide_but_followup = true; //Hide Followup button
    var hide_but_create_problem = true; //Hide Create Problem
    var hide_but_update = false; //Hide Update Button
    var hide_but_save = true; //Hide Save Button
    var hide_but_create_security_incident = true; //Hide create security incident button
    var hide_but_responses = true; //Hide button Responses
    var hide_but_remote_connection = true; //Hide Remote Connection
    var hide_but_reroute_initial_level = true; //Hide Reroute initial level
    var hide_but_reroute_keep_level = true; //Hide reroute keep level
    var hide_but_forward_next_level = true; // Hide Forward to next level
  
    //---------------Align Top buttons to Center------------------
    var align_but_center = true; //Alighns all buttons to the center
  
    //----------------Hide default warnign message on load..........
  
    var hide_initial_warning_message = true;
  
    //-----------Hide Section tabs-------------------
  
    var hide_system_tab = true; //Hide System tabvar
    var hide_related_records_tab = true;
  
    //---------------Hide Related Searches Button...................
  
    var hide_related_searches_button = true;
  
    //---------------Hide the buton bar below comments------------
    var hide_buttonb_bar_bottom = true; //Hide the button bar below the comments
  
    //---------------Hide Related Links--------------------------
    var hide_related_links = true; //Hide the related links section
  
    //--------------Hide list of Junk tabs--------------------
    var hide_all_junk_tabs_except_incident_tasks = true; //Hide all Child tabs except Incident tabs for external ticket
    var hide_all_junk_tabs = false; //Hide all child tabs section
  
    //--------------Color button----------------
    var color_save = "lightcyan";
    var color_update = "#AAF0D1"; //Magic Mint
    var color_assign_to_me = "lightyellow";
    var color_resolve = "lightgreen";
    var color_send_reply = "lightpink";
    var color_reroute_init = "linen";
    //---------------Default Message Type ---------
    // Communication tab default message type. comments => External Info, work_notes => Internal Info
    var default_msg_type = "comments";
  
    //-----------Default Resolution information fields(UX Team)----------
    //Set default values
  
    var enable_resoution_info_default_values = true; //Enable the following default values for these fields.
    //Reolution_code = solved-Fix-Provided
    //Affected Area = Application
    //Symptom = Others (specify)
  
    //--------increase left side section width to 65% from 50%-----
    var header_info_increase_width_left = true;
  
    //-----------------Font size-----------------------------
  
    //--------increase font size for Text Area-------------
    var increase_text_area_font_size = true;
    var text_area_font_size = "13px";
  
    var formatAcivities = true;
  
    //---------------Skip Save Change Dialog Box ------------------
  
    var skip_save_dialog = true; //This will automatically discard the changes...
  
    //--------------------Incident List Filter page----------------------
    var incident_filter_list_page_font_size = "15px";
  
    //******************End of Configuration****************************
  
    //******************Start of Developer Area************************
  
    /*
    var increase_activity_font_size = true;
    var activities_font_size = "13px"; //Set the activities font size
    var font_family = "Verdana"; //Set the font type for activities...
   */
  
    var col_css = "color:#c411e8;font-weight: 600"; // Default color to print in console (Works only in chrome)
    var fieldChangeBlockCount = 0;
    var isPrevRejectionFieldChange = false;
    var gv_browser = detectBrowser(); // Find the Browser type
  
    var listPageLoaded = false; //Variable to check whether load event is triggered for list page.
  
    print("Print Window Name");
    //console.log(window.self);
  
    if (gv_browser == "Firefox") {
      //Load Event is not trigged for firefox
      simplifySnow();
    } else {
      // For all browsers wait for load event
      print("Waiting for Load Event");
  
      setTimeout(function () {
        //Load Event is not triggered for Incident List page for back button. We will load the page in 3 seconds ..if load event is not triggered.
        ValidateAndLoadListPage();
      }, 3000);
  
      window.addEventListener(
        "load",
        function () {
          print("Load event Completed");
          simplifySnow();
        },
        true
      );
    }
  
    function simplifySnow() {
      if (window.self.name !== "undefined" && window.self.name == "gsft_main") {
        if (
          document.title !== "undefined" &&
          document.title.includes("| Incident | HCSM") && //Incident Detail page
          document.title.search("Create") < 0 //it is not create a incident page
        ) {
          // if Create..it is a page to create incident
          print("Entered to Incident Window");
  
          if (hide_but_followup) hideElementById("connectFollowWidget");
          if (hide_but_create_problem)
            hideElementById("2f43c471c0a8006400a07440e49924c2");
          if (hide_but_update) hideElementById("sysverb_update");
          if (hide_but_save) hideElementById("sysverb_update_and_stay");
          if (hide_but_create_security_incident)
            hideElementById("create_security_incident");
          if (hide_but_responses) hideElementById("message_template");
          if (hide_but_remote_connection) hideElementById("remote_connection");
          if (hide_but_reroute_initial_level) hideElementById("reroute_incident");
          if (hide_but_reroute_keep_level) hideElementById("send_back_incident");
          if (hide_but_forward_next_level)
            hideElementById("forward_next_level_inc");
  
          //Align the butttons to center on top of the page..
          if (align_but_center)
            document.getElementsByClassName(
              "navbar_ui_actions"
            )[0].style.textAlign = "center";
  
          //Color the Existing Buttons...
  
          SetBackgroundColorById("sysverb_update_and_stay", color_save); //Save button color
          SetBackgroundColorById("sysverb_update", color_update); // Update button color
          SetBackgroundColorById("ws_assign_incident_to_me", color_assign_to_me); //Assign to me button color
          SetBackgroundColorById("resolve_incident", color_resolve); // resolve button color
          SetBackgroundColorById("awaiting_requestor", color_send_reply); // Send Reply button color
          SetBackgroundColorById("reroute_incident", color_reroute_init); //Reroute initiaal level button color
  
          //Hide the below button bar after commetns
          if (hide_buttonb_bar_bottom)
            document.getElementsByClassName(
              "form_action_button_container"
            )[0].style.display = "none";
  
          //Hide the warning messaging..
          if (hide_initial_warning_message) {
            var warn_msg = document.getElementById("close-messages-btn");
            if (warn_msg !== null) warn_msg.click();
          }
  
          //Hide Section Tabs
          let lv_tab_section = document.getElementById("tabs2_section");
  
          if (hide_system_tab) {
            lv_tab_section.childElements()[2].style.display = "none"; //Hide 3rd Tab
          }
  
          if (hide_related_records_tab) {
            lv_tab_section.childElements()[3].style.display = "none"; //Hide 4rd Tab
          }
  
          //lv_tab_section.childElements()[0].childNodes[0].click(); //Soemtimes Description tab is visible by default. Overriding the bug by clicking the first tab
  
          //Set teh default Values..
          document.getElementById("incident.u_message_type").value =
            default_msg_type;
  
          //Set the default values for Resolution Information.
          if (enable_resoution_info_default_values) {
            document.getElementById("incident.close_code").value =
              "solved_fix_provided";
            document.getElementById("incident.u_affected_area").value =
              "application";
            document.getElementById("incident.u_symptom").value = "other_specify";
            document.getElementById("ni.incident.u_notes_to_comments").click();
          }
  
          //Hide Related Searches
  
          if (hide_related_searches_button) {
            let lv_desc_section = document.getElementById(
              "0fdb6af8db4b33803da8366af4961947"
            );
            let lv_rel_search_section =
              lv_desc_section.getElementsByClassName("custom-form-group");
            lv_rel_search_section[0].style.display = "none";
            lv_rel_search_section[1].style.display = "none";
          }
  
          //Hide Related links section
          if (hide_related_links) {
            let related_container = document.querySelectorAll(
              '[aria-label="Related Links"]'
            );
            related_container[0].style.display = "none";
          }
  
          //This will hide all the child tabs...
          if (hide_all_junk_tabs) {
            let lv_tabs2_list = document.getElementById("tabs2_list"); //Parent Continer of list of tabs.
            lv_tabs2_list.style.display = "none";
            document.getElementById("tabs2_spacer").style.display = "none"; //View of each tab
            document.getElementById("related_lists_wrapper").style.display =
              "none";
            document.getElementById("page_timing_div").style.display = "none"; //load time  statistics of page
  
            let observer = new MutationObserver(function (mutations) {
              mutations.forEach(function (mutationRecord) {
                print("Mutation Triggered for Junk Tabs");
                lv_tabs2_list.style.display = "none";
              });
            });
  
            observer.observe(lv_tabs2_list, {
              attributes: true,
              attributeFilter: ["style"],
            });
          } else if (hide_all_junk_tabs_except_incident_tasks) {
            let lv_tabs2_list_cont = document.getElementById("tabs2_list");
  
            let lv_tab_sep_list =
              lv_tabs2_list_cont.getElementsByClassName("tab_spacer"); //Seperator for each tab
            if (lv_tab_sep_list !== "undefined") {
              for (let i = 0; i < lv_tab_sep_list.length; i++) {
                lv_tab_sep_list[i].style.display = "none";
              }
            }
  
            let lv_tab_list =
              lv_tabs2_list_cont.getElementsByClassName("tab_header");
            if (lv_tab_list !== "undefined") {
              for (let i = 0; i < lv_tab_list.length; i++) {
                //Tab 3 is the Incident Tasks where External reaction tickets can be added
                if (i != 3) lv_tab_list[i].style.display = "none";
              }
            }
  
            let observer = new MutationObserver(function (mutations) {
              mutations.forEach(function (mutationRecord) {
                print("Mutation Triggered for Junk Tabs");
  
                HideChildTabs(mutationRecord.target);
              });
            });
  
            observer.observe(lv_tabs2_list_cont, {
              childList: true,
              subtree: false,
            });
  
            document.getElementById("page_timing_div").style.display = "none"; //load time  statistics of page
          }
          //Increase left side of Header Details width
          if (header_info_increase_width_left) {
            //Decreate Right side header section to 40%
            document
              .getElementById("1078e6b4db4b33803da8366af4961918")
              .childElements()[0].childNodes[1].style.width = "40%";
  
            //Increase left side header section to 60%
            document
              .getElementById("1078e6b4db4b33803da8366af4961918")
              .childElements()[0].childNodes[0].style.width = "60%";
          }
  
          if (increase_text_area_font_size) {
            //Communication Tab - Text Area font size increase
            let lv_iframe_comm = document.getElementById(
              "incident.u_message_ifr"
            );
  
            //Communication tab - Increase Text Area height to 120px by default
            lv_iframe_comm.style.height = "120px";
            let lv_comm_txt_edit =
              lv_iframe_comm.contentWindow.document.getElementById("tinymce");
            lv_comm_txt_edit.style.fontSize = text_area_font_size;
  
            // Communication Tab - increase line spacing inside the text area
            let lv_p_comm_tags = lv_comm_txt_edit.getElementsByTagName("p");
            for (let i = 0; i < lv_p_comm_tags.length; i++) {
              set_line_spacing(lv_p_comm_tags[i]);
            }
  
            //-----
  
            //Inital Description  Tab
            let lv_iframe_initial_desc = document.getElementById(
              "incident.description_ifr"
            );
  
            //Increase teh default height of the initial description tab..
  
            lv_iframe_initial_desc.style.height = "180px";
            let lv_init_txt_edit =
              lv_iframe_initial_desc.contentWindow.document.getElementById(
                "tinymce"
              );
            lv_init_txt_edit.style.fontSize = text_area_font_size;
  
            //Initial Desc tab - Increase line spacing inside the text Area
            let lv_p_initial_tags = lv_init_txt_edit.getElementsByTagName("p");
            for (let i = 0; i < lv_p_initial_tags.length; i++) {
              set_line_spacing(lv_p_initial_tags[i]);
            }
            //---
  
            //Resulution Tab
            let lv_iframe_res_desc = document.getElementById(
              "incident.close_notes_ifr"
            );
  
            //Resolution tab - increase height of the text area
            lv_iframe_res_desc.style.height = "180px";
            let lv_resol_txt_edit =
              lv_iframe_res_desc.contentWindow.document.getElementById("tinymce");
            lv_resol_txt_edit.style.fontSize = text_area_font_size;
  
            //Resolution Tab - Increase line spacing of the text area
            let lv_p_res_tags = lv_resol_txt_edit.getElementsByTagName("p");
            for (let i = 0; i < lv_p_res_tags.length; i++) {
              set_line_spacing(lv_p_res_tags[i]);
            }
          }
          if (formatAcivities) {
            var activities_ul_cont = document.getElementById(
              "sn_form_inline_stream_entries"
            );
            var activities_ul = activities_ul_cont.childNodes[0];
            for (let i = activities_ul.childNodes.length - 1; i >= 0; i--) {
              //Send Activity for formatting
              formatActivity(activities_ul.childNodes[i]);
            }
          }
  
          if (skip_save_dialog) {
            window.onbeforeunload = function () {
              // Your Code here
              return null; // return null to avoid pop up
            };
  
            waitForElm("#dirty_form_modal_confirmation").then((elm) => {
              elm.querySelector('button[data-action="discard"]').click();
            });
          }
        }
        // List Page Modification...
        else if (
          document.title !== "undefined" &&
          document.title == "Incidents | HCSM"
        ) {
          listPageLoaded = true;
          document.getElementById(
            "incident_expanded"
          ).childNodes[4].style.fontSize = incident_filter_list_page_font_size;
          // Hide Timing Statistics
          waitForElm("#page_timing_div").then((elm) => {
            hideElementById("page_timing_div");
          });
        }
      }
    }
  
    function formatActivity(itemActivity) {
      var elem_posted_by_cont = itemActivity.childNodes[0];
      var elem_activity_type_cont = itemActivity.childNodes[1];
      var elem_info_cont = itemActivity.childNodes[2];
  
      formatActivityName(elem_posted_by_cont);
      var activity_type = formatActivityType(elem_activity_type_cont);
  
      if (activity_type == "Field changes") {
        fieldChangeBlockCount = fieldChangeBlockCount + 1;
      }
      formatActivityInfo(elem_info_cont, activity_type);
    }
  
    function formatActivityInfo(itemActivityElem, activity_type) {
      const activity_info_fontStyle =
        'normal 400 15px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
      const acvitiy_line_height = "21px";
  
      //Increase the font size for Internal and External Info
  
      if (activity_type == "Internal Info" || activity_type == "External Info") {
        let info_elem = itemActivityElem.querySelector(
          'span[id*="journal-content_"]'
        ); //Find the span tag with the id containing Journal content
        if (info_elem !== null) {
          info_elem.style.font = activity_info_fontStyle;
          //Set background color
          let lv_isSolutonProided = isSolutionProvided(info_elem);
          if (lv_isSolutonProided) {
            info_elem.parentElement.parentElement.parentElement.style.backgroundColor =
              "#f0ffed"; //Light GreenparentElement.parentElement.parentElement.
          } else if (isPrevRejectionFieldChange) {
            //If previous block is rejection block then this is the comment of rejection
            info_elem.parentElement.parentElement.parentElement.style.backgroundColor =
              "#f5eae9"; //Red color
            isPrevRejectionFieldChange = false; //Change its state to false again.
          } else {
            info_elem.parentElement.parentElement.parentElement.style.backgroundImage =
              "linear-gradient(#f5f7f9,#f5f7f9)"; //Grey color
          }
        }
      } else if (activity_type == "Field changes") {
        let info_elem = itemActivityElem.childNodes[0].childNodes[0]; //Ul Element with list of fields
        if (fieldChangeBlockCount == 1) {
          //This is the inital posted by requester
          formatInitialSubmission(info_elem);
        } else {
          formatFields(info_elem);
        }
      }
    }
  
    function formatFields(ActivityFieldsUl) {
      const activity_field_fontStyle =
        'normal 400 14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
      const activity_field_fontStyle_weight =
        'normal 600 14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
      let foundRejection = false;
      for (let i = 0; i < ActivityFieldsUl.childNodes.length; i++) {
        let item_field_node = ActivityFieldsUl.childNodes[i];
        if (
          item_field_node.childNodes[0].innerText == "Priority" &&
          item_field_node.childNodes[1].childNodes.length == 3
        ) {
          //Format Priority on Change
          //Highligh High priority in Red..
          if (
            (item_field_node.childNodes[1].childNodes[0].innerText.charAt(0) ==
              "1" ||
              item_field_node.childNodes[1].childNodes[0].innerText.charAt(0) ==
                "2") &&
            (item_field_node.childNodes[1].childNodes[2].innerText.charAt(0) ==
              "3" ||
              item_field_node.childNodes[1].childNodes[2].innerText.charAt(0) ==
                "4")
          ) {
            //Very High & High
            item_field_node.childNodes[0].style.font = activity_field_fontStyle; //Caption
            item_field_node.childNodes[1].style.font = activity_field_fontStyle; //Value
            item_field_node.childNodes[1].childNodes[0].style.color = "#ee0935"; //word
            item_field_node.childNodes[1].childNodes[0].style.font =
              activity_field_fontStyle_weight;
            formatBusinessImpact(item_field_node);
          } else if (
            (item_field_node.childNodes[1].childNodes[0].innerText.charAt(0) ==
              "3" ||
              item_field_node.childNodes[1].childNodes[0].innerText.charAt(0) ==
                "4") &&
            (item_field_node.childNodes[1].childNodes[2].innerText.charAt(0) ==
              "1" ||
              item_field_node.childNodes[1].childNodes[2].innerText.charAt(0) ==
                "2")
          ) {
            //Medium and Low
            item_field_node.childNodes[1].childNodes[0].style.color = " #0f8f3e";
            item_field_node.childNodes[1].childNodes[0].style.font =
              activity_field_fontStyle_weight;
          }
        } else if (
          item_field_node.childNodes[0].innerText == "Assignment group" &&
          item_field_node.childNodes[1].childNodes.length == 3
        ) {
          //Format Assignment Group on Change
          item_field_node.childNodes[1].childNodes[0].style.color = "#5a32af";
          item_field_node.childNodes[1].childNodes[0].style.font =
            activity_field_fontStyle_weight;
        } else {
          item_field_node.childNodes[0].style.font = activity_field_fontStyle;
          item_field_node.childNodes[1].style.font = activity_field_fontStyle;
        }
        foundRejection =
          item_field_node.childNodes[0].innerText == "State" &&
          item_field_node.childNodes[1].childNodes[2].innerText == "Resolved"; //it is a rejection field changes block
      }
  
      isPrevRejectionFieldChange = foundRejection;
    }
  
    function formatInitialSubmission(ActivityFieldsUl) {
      const activity_field_fontStyle =
        'normal 400 14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
      const answer_color = "#291675";
  
      for (let i = 0; i < ActivityFieldsUl.childNodes.length; i++) {
        let item_field_node = ActivityFieldsUl.childNodes[i];
        if (
          item_field_node.childNodes[0].innerText == "Priority" &&
          (item_field_node.childNodes[1].childNodes[0].innerText.charAt(0) ==
            "1" ||
            item_field_node.childNodes[1].childNodes[0].innerText.charAt(0) ==
              "2")
        ) {
          item_field_node.childNodes[1].childNodes[0].style.color = "#ee0935"; //Red color Priority
          item_field_node.childNodes[1].childNodes[0].style.font =
            activity_field_fontStyle;
        } else if (item_field_node.childNodes[0].innerText == "Description") {
          item_field_node.childNodes[0].style.font = activity_field_fontStyle;
  
          let desc_content_div =
            item_field_node.childNodes[1].childNodes[0].shadowRoot.childNodes[0];
          let desc_content_div_text =
            item_field_node.childNodes[1].childNodes[0].shadowRoot.childNodes[0]
              .innerText;
  
          item_field_node.childNodes[0].style.font = activity_field_fontStyle;
  
          let FindAnchors = desc_content_div.getElementsByTagName("a"); //If any anchors tags are there dont format the initial Submission
          if (FindAnchors.length == 0) {
            let Msglines = desc_content_div_text.split(/\r?\n/);
  
            let new_html_cont = "";
  
            item_field_node.childNodes[1].style.font = activity_field_fontStyle;
            item_field_node.childNodes[1].style.fontSize = "15px";
            item_field_node.childNodes[1].style.lineHeight = "21px";
            for (let i = 0; i < Msglines.length; i++) {
              let curr_line = Msglines[i].replace(/(\r\n|\n|\r)/gm, "");
  
              if (questionSearch(Msglines[i])) {
                if (i == 0) {
                  new_html_cont = new_html_cont + curr_line;
                } else {
                  if (curr_line !== "") {
                    new_html_cont = new_html_cont + "<br>" + Msglines[i] + "";
                  }
                }
              } else {
                new_html_cont =
                  new_html_cont + "<span style='color:blue;margin-left:25px'>";
                if (i == 0) {
                  new_html_cont = new_html_cont + curr_line + "</span>";
                } else {
                  if (curr_line !== "") {
                    new_html_cont =
                      new_html_cont + "<br>" + curr_line + "</span>";
                  }
                }
              }
            }
            //Set hte new parsed HTML content
            item_field_node.childNodes[1].childNodes[0].shadowRoot.childNodes[0].innerHTML =
              new_html_cont;
          } else {
            item_field_node.childNodes[1].style.font = activity_field_fontStyle;
            item_field_node.childNodes[1].style.fontSize = "15px";
            item_field_node.childNodes[1].style.lineHeight = "21px";
          }
        } else {
          item_field_node.childNodes[0].style.font = activity_field_fontStyle;
          item_field_node.childNodes[1].style.font = activity_field_fontStyle;
        }
      }
    }
  
    function questionSearch(line_text) {
      const questions = [
        "1.Please provide Landscape details and System ID/Client. Also explicitly mention if it is a private landscape/ Cloud Tenant (if it is cloud systems then provide tenant /logon).",
        "e.g.:  GSA - Public MG4/001 HE4/400 or S/4HC E0T (provide tenant URL)",
        "2.  Demo Scenario ID & Page Number (if applicable)? - Error description and steps to reproduce the error with screenshot/recordings.",
        "3. Demo date & time and Demo ID (if applicable)?",
        "4. Please provide affected demo Users [ eg. purchaser or a personal demo user ( I/C/D) ]?",
        "5. Are you accessing Secure Demo Access or Storefront /Citrix Desktop? (*applicable for SDE landscape only)",
        "6. Information of your Network/Device.",
        "• Network type – F5-VPN or WiFi",
        "• Device Type - Laptop, Mobile Device",
        "Note: The Support SLAs exist only for Standard Scripts. We'll support any issues outside of this, but we are not governed by any SLAs",
        "1. Basic Information",
        "a. Demo ID from Demo Calendar ?",
        "b. Demo Date and Time ?",
        "c. How can you be contacted ?",
        "2. Demo Realm/Network Info",
        "a. What Demo script (Script ID and Name) are you using?",
        "a. User-ID and Password ? If Network are you logging in a buyer or supplier?",
        "b. Which Realm is used ?",
        "c. If integrated scenario which landscape are you in ?",
        "3. Detailed Problem Description",
        "a. Issue description:",
        "b. Steps to recreate the issue (screen shots or screen cam)",
        "c. Master Data used (PO, Inv, contract...)",
        "----------------------------------",
      ];
  
      for (let i = 0; i < questions.length; i++) {
        if (line_text == questions[i]) {
          return true;
        }
      }
      return false;
    }
  
    function formatBusinessImpact(item_field_node) {
      //Only in the case of High priority
      const activity_field_fontStyle =
        'normal 400 14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
      let lv_parent = item_field_node.parentElement;
      for (let i = 0; i < lv_parent.childNodes.length; i++) {
        if (
          lv_parent.childNodes[i].childNodes[0].innerText == "Business impact"
        ) {
          lv_parent.childNodes[i].childNodes[0].style.font =
            activity_field_fontStyle;
          lv_parent.childNodes[i].childNodes[1].style.font =
            activity_field_fontStyle;
        }
      }
    }
  
    function isSolutionProvided(ActivityInfoElem) {
      let MsgContText = ActivityInfoElem.shadowRoot.childNodes[0].innerText;
      const Msglines = MsgContText.split(/\r?\n/);
      if (Msglines[0] == "Solution provided:") {
        return true;
      } else {
        return false;
      }
    }
  
    function isRejected(ActivityInfoElem) {
      let MsgCont = ActivityInfoElem.shadowRoot.childNodes[0].innerText;
      const Msglines = MsgCont.split(/\r?\n/);
      if (Msglines[0] == "Solution provided:") {
        return true;
      } else {
        return false;
      }
    }
  
    function formatActivityName(itemActivityElem) {
      const actvity_name_color = "#2c5cc5";
      //   const actvity_name_fontSize = "14px";
      //   const activity_name_fontWeight = "600";
      const activity_name_fontStyle =
        'normal 600 14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  
      itemActivityElem.style.color = actvity_name_color;
      itemActivityElem.style.font = activity_name_fontStyle;
      // itemActivity.style.fontSize = actvity_name_fontSize;
      // itemActivity.style.fontWeight = activity_name_fontWeight;
      // itemActivity.style.fontFamily = activity_name_fontFamily;
    }
    function formatActivityType(itemActivityElem) {
      const actvity_meta_color = " #dd9119";
      const activity_meta_fontStyle =
        'normal 600 14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  
      let activity_type = itemActivityElem.childNodes[0].childNodes[0].innerText;
      if (activity_type == "Internal Info" || activity_type == "External Info") {
        itemActivityElem.style.font = activity_meta_fontStyle;
        itemActivityElem.style.color = actvity_meta_color;
      } else {
        hideFormFieldActivity(itemActivityElem);
      }
  
      return activity_type;
    }
  
    function hideFormFieldActivity(itemActivityElem)
    {
      let button = document.createElement("button");
      button.innerHTML = "Expand";
    
  
      button.addEventListener ("click", function() {
        let lv_vis_status =  this.parentElement.childNodes[2].style.display;
        if(lv_vis_status == "none")
        {
          this.parentElement.childNodes[2].style.display = "inline-block";
        }
        else{
          this.parentElement.childNodes[2].style.display = "none";
        }
      });
  
      itemActivityElem.prepend(button);
      
    }
  
    function ValidateAndLoadListPage() {
      if (!listPageLoaded) {
        if (window.self.name !== "undefined" && window.self.name == "gsft_main") {
          if (
            document.title !== "undefined" &&
            document.title == "Incidents | HCSM"
          ) {
            print("Triggered Custom Load Event");
            dispatchEvent(new Event("load"));
          }
        }
      }
    }
  
    function set_line_spacing(p_tag) {
      p_tag.style.lineHeight = "18px";
    }
    function hideElementById(elementId) {
      let item = document.getElementById(elementId);
      if (item != null) {
        item.style.display = "none";
      }
    }
  
    function waitForElm(selector) {
      return new Promise((resolve) => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
        }
  
        const observer = new MutationObserver((mutations) => {
          if (document.querySelector(selector)) {
            resolve(document.querySelector(selector));
            observer.disconnect();
          }
        });
  
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      });
    }
  
    function HideChildTabs(childElemContainer) {
      //Will be called multiple times.
      let lv_tab_sep_list =
        childElemContainer.getElementsByClassName("tab_spacer"); //Seperator for each tab
      if (lv_tab_sep_list !== "undefined") {
        for (let i = 0; i < lv_tab_sep_list.length; i++) {
          lv_tab_sep_list[i].style.display = "none";
        }
      }
  
      let lv_tab_list = childElemContainer.getElementsByClassName("tab_header");
      if (lv_tab_list !== "undefined") {
        for (let i = 0; i < lv_tab_list.length; i++) {
          //Tab 3 is the Incident Tasks where External reaction tickets can be added
          if (i != 3) lv_tab_list[i].style.display = "none";
        }
      }
    }
  
    function SetBackgroundColorById(lv_elem_id, lv_color) {
      let item = document.getElementById(lv_elem_id);
      if (item !== null) item.style.backgroundColor = lv_color;
    }
  
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    function print(val) {
      if (gv_browser == "Chrome") console.log("%c===>" + val + "<===", col_css);
      else console.log("===>" + val + "<===");
    }
  
    function detectBrowser() {
      if (
        (navigator.userAgent.indexOf("Opera") ||
          navigator.userAgent.indexOf("OPR")) != -1
      ) {
        return "Opera";
      } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
      } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
      } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
      } else if (
        navigator.userAgent.indexOf("MSIE") != -1 ||
        !!document.documentMode == true
      ) {
        return "IE"; //crap
      } else {
        return "Unknown";
      }
    }
  })();
  