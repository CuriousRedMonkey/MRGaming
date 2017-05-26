/* ******* */
/* Miscellaneus variables for the caller. */
/* ******* */

var cssCurrent; // Holds the reference to the current 'cascade style sheet' (can be a layer or a div).
var NavigationWidth = 150; // The logo/menu/copyright/etc. fits within this space.  Not necessary for images be 100% of it.

var VPaddingAboveWhatPage = 40; // Height padding above the "current page: <name>" display.
var VSizeOfWhatPage = 0; // Height of the layer/div/text of "current page:".

var VPaddingAroundMenu = 40; // Height padding above and below the menu.  Used by the caller and in the DrawMenu() code.


   /* ******* */
   /* When the user clicks on a link, move the mouse to the logo so that preview/summary info is shown. */
   /* Alternate: MouseMove(); when a new page is loaded call this instead. More attractive if it works timing wise. */
   /* Note: Any other approach, keeping the current preview model, is NOT a consistent implementation inter-browsers. */
   /* FUTURE: Figure out how to move the mouse. Java will probably have to be used! (Couldn't figure out how, yet) */
   /* ******* */

   function MouseClick()
   {
      if (usesLayers)
      {
        // e.pageX and pageY are read only properties, so cannot use them.
      }
      if (usesDivs)
      {
         // event.x and y are read only properties, so cannot use them. (event is owned by window)
      }
   }

   /* ******* */
   /* In theory, the "name" can be any element, not only buttons. */
   /* Note: Not formatting function as MouseIsOut( name ).  See comment about "spaces" in 'default.htm'. */
   /* ******* */

   function MouseIsOut(name) 
   {
      if (name == "Logo")
      {
         if (usesStyles)
         {
            document.imgLogo.src = drImages + "mrgLogo.jpg"; // All "drImages" reference the calling HTML's variable.
         }
         // else, No reason to do anything with the logo image.
      }
      else
      if (usesLayers)
      {
         document["img" + name].src = drImages + "btn" + name + "Out.gif"; 
      }
      else
      if (usesDivs)
      {
         document.all["img" + name].src = drImages + "btn" + name + "Out.gif";
      }
   }

   /* ******* */
   /* In theory, the "name" can be any element, not only buttons. */
   /* ******* */

   function MouseIsOver(name) 
   {
      if (usesLayers)
      {
         if (cssCurrent != "")
         {
            cssCurrent.visibility = "hidden";
         }

         if (name == "Logo")
         {
            document.imgLogo.src = drImages + "mrgLogoOver.jpg";
            document.laySummary.visibility = "visible";
            cssCurrent = document.laySummary;
         }
         else
         {
            document["img" + name].src = drImages + "btn" + name + "Over.gif";
            document["lay" + name + "Summary"].visibility = "visible";
            cssCurrent = document["lay" + name + "Summary"];
         }
      }
      else
      if (usesDivs)
      {
         if (cssCurrent != "")
         {
            cssCurrent.style.visibility = "hidden";
         }

         if (name == "Logo")
         {
            document.imgLogo.src = drImages + "mrgLogoOver.jpg";
            divSummary.style.visibility = "visible";
            cssCurrent = divSummary;
         }
         else
         {
            document.all["img" + name].src = drImages + "btn" + name + "Over.gif";
            document.all["div" + name + "Summary"].style.visibility = "visible";
            cssCurrent = document.all["div" + name + "Summary"];
         }
      }
   }

   /* ******* */
   /* The menu size changes depending on the number of buttons that appear upon it.  Titles/Alts are passed in also. */
   /* Note: Even though the menu elements are reference by other parts of the document, I will keep all of the creation */
   /*       information within this and DisabledMenuItems. The buttons are position.  Elements are based on variables. */
   /* FUTURE: Make the argument an array and loop through it? (I don't have the time now to learn how.)  Keep max to 7. */
   /* ******* */

   function DrawMenu(mnuName, n3D, cssTop, cssWidth, NumOfButtons, b1, t1, b2, t2, b3, t3, b4, t4, b5, t5, b6, t6, b7, t7)
   {
      if (NumOfButtons == 0)
      {
         // bye bye
      }
      else
      if (usesStyles)
      {
         var VScalingFactor = 0.75; // Scaling factors.
         var HScalingFactor = 0.75;
         // The button standard is 150 wide and 50 high (3:1), so their is no need to access their properties.
         var ButtonWidth = 150 * HScalingFactor; // Buttons do not have to maintain their original proportions.
         var ButtonHeight = 50 * VScalingFactor;
         var ButtonVSpacing = 15 * VScalingFactor;
         // The menu face is also 150 wide (and remains so, to ease calculations), however the menu is scaled in its height
         // depending on the number of buttons that will be placed on it, so use the button height scaling factor.
         var MenuHeightPadding = 45 * VScalingFactor;
         var MenuHeight = ButtonHeight * NumOfButtons + ButtonVSpacing * (NumOfButtons-1) + MenuHeightPadding * 2;
         var MenuLeftEdge = 30; // The menu is rotated so that it has its left edge showing, so use MenuFace in calcs. 
         var MenuFace = NavigationWidth - MenuLeftEdge; // This must be >7+ than the ButtonWidth to format correctly.
         var MenuWidthPadding = (MenuFace - ButtonWidth) / 2; 
         var MenuRotation = n3D * HScalingFactor; // The rotation should show a slight offset for a 3D effect.
         var ButtonLeft = MenuLeftEdge + MenuWidthPadding + MenuRotation; 

         // Maintain two different logo/menu systems until the best one becomes obvious. (Rect vs '', Stone vs Background)

         // Note: Block element names (lay*/div*/anc*) are here as documentation, and are not used outside of the funtion.
         //       However, they do exist in a safe format (ID/NAME), so are available out of the function (if ever needed).

         // Don't bother checking "NumOfButtons" with the "b" values.  It will be obvious to the developer/designer.

         if (usesLayers)
         {
            document.write( "<LAYER ID='layMenu' NAME='layMenu' TOP='" + 
                              cssTop + "' LEFT='10'>" );
            document.write( "   <IMG SRC='" + drImages + mnuName + "' ID='imgMenu' NAME='imgMenu'" +
                            "    BORDER='0' WIDTH='" + cssWidth + "' HEIGHT='" + MenuHeight + "'>" );
            document.write( "</LAYER>" );

            if (b1 != "")
            {
               document.write( "<LAYER ID='lay" + b1 + "Link' NAME='lay" + b1 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding) + "' LEFT='" + ButtonLeft + "'>" +
                               "   <A HREF='" + b1 + ".htm' OnMouseover=MouseIsOver('" + b1 + "') " +
                               "    OnMouseout=MouseIsOut('" + b1 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b1 + "Out.gif' ID='img" + 
                                    b1 + "' NAME='img" + b1 + "' BORDER='0' TITLE='" + t1 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" + 
                               "</LAYER>" ); 
            }

            if (b2 != "")
            {
               document.write( "<LAYER ID='lay" + b2 + "Link' NAME='lay" + b2 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 1) + 
                               "' LEFT='" + ButtonLeft + "'>" +
                               "   <A HREF='" + b2 + ".htm' OnMouseover=MouseIsOver('" + b2 + "') " +
                               "    OnMouseout=MouseIsOut('" + b2 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b2 + "Out.gif' ID='img" + 
                                    b2 + "' NAME='img" + b2 + "' BORDER='0' TITLE='" + t2 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" + 
                               "</LAYER>" ); 
            }

            if (b3 != "")
            {
               document.write( "<LAYER ID='lay" + b3 + "Link' NAME='lay" + b3 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 2) + 
                               "' LEFT='" + ButtonLeft + "'>" +
                               "   <A HREF='" + b3 + ".htm' OnMouseover=MouseIsOver('" + b3 + "') " +
                               "    OnMouseout=MouseIsOut('" + b3 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b3 + "Out.gif' ID='img" + 
                                    b3 + "' NAME='img" + b3 + "' BORDER='0' TITLE='" + t3 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" + 
                               "</LAYER>" ); 
            }

            if (b4 != "")
            {
               document.write( "<LAYER ID='lay" + b4 + "Link' NAME='lay" + b4 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 3) + 
                               "' LEFT='" + ButtonLeft + "'>" +
                               "   <A HREF='" + b4 + ".htm' OnMouseover=MouseIsOver('" + b4 + "') " +
                               "    OnMouseout=MouseIsOut('" + b4 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b4 + "Out.gif' ID='img" + 
                                    b4 + "' NAME='img" + b4 + "' BORDER='0' TITLE='" + t4 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" + 
                               "</LAYER>" ); 
            }

            if (b5 != "")
            {
               document.write( "<LAYER ID='lay" + b5 + "Link' NAME='lay" + b5 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 4) + 
                               "' LEFT='" + ButtonLeft + "'>" +
                               "   <A HREF='" + b5 + ".htm' OnMouseover=MouseIsOver('" + b5 + "') " +
                               "    OnMouseout=MouseIsOut('" + b5 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b5 + "Out.gif' ID='img" + 
                                    b5 + "' NAME='img" + b5 + "' BORDER='0' TITLE='" + t5 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" + 
                               "</LAYER>" ); 
            }

            if (b6 != "")
            {
               document.write( "<LAYER ID='lay" + b6 + "Link' NAME='lay" + b6 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 5) + 
                               "' LEFT='" + ButtonLeft + "'>" +
                               "   <A HREF='" + b6 + ".htm' OnMouseover=MouseIsOver('" + b6 + "') " +
                               "    OnMouseout=MouseIsOut('" + b6 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b6 + "Out.gif' ID='img" + 
                                    b6 + "' NAME='img" + b6 + "' BORDER='0' TITLE='" + t6 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" + 
                               "</LAYER>" ); 
            }

            if (b7 != "")
            {
               document.write( "<LAYER ID='lay" + b7 + "Link' NAME='lay" + b7 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 6) + 
                               "' LEFT='" + ButtonLeft + "'>" +
                               "   <A HREF='" + b7 + ".htm' OnMouseover=MouseIsOver('" + b7 + "') " +
                               "    OnMouseout=MouseIsOut('" + b7 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b7 + "Out.gif' ID='img" + 
                                    b7 + "' NAME='img" + b7 + "' BORDER='0' TITLE='" + t7 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" + 
                               "</LAYER>" ); 
            }
         }
         else
         if (usesDivs)
         {
            // IE doesn't pad quite enough as compared to Netscape, so give it a little extra. (+10)

            document.write( "<DIV ID='divMenu' NAME='divMenu'" +
                            " STYLE='position: absolute; top: " + 
                              eval(cssTop + 10) + "px; left: 10px'>" );
            document.write( "   <IMG SRC='" + drImages + mnuName + "' ID='imgMenu' NAME='imgMenu'" +
                            "    BORDER='0' WIDTH='" + NavigationWidth + "' HEIGHT='" + MenuHeight + "'>" );
            document.write( "</DIV>" );

            if (b1 != "")
            {
               document.write( "<DIV ID='div" + b1 + "Link' NAME='div" + b1 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding) + "px; left: " + 
                                         ButtonLeft + "px'>" +
                               "   <A HREF='" + b1 + ".htm' OnMouseover=MouseIsOver('" + b1 + "') " +
                               "    OnMouseout=MouseIsOut('" + b1 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b1 + "Out.gif' ID='img" + 
                                    b1 + "' NAME='img" + b1 + "' BORDER='0' TITLE='" + t1 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" +
                               "</DIV>" ); 
            }

            if (b2 != "")
            {
               document.write( "<DIV ID='div" + b2 + "Link' NAME='div" + b2 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 1) + 
                               "px; left: " + ButtonLeft + "px'>" +
                               "   <A HREF='" + b2 + ".htm' OnMouseover=MouseIsOver('" + b2 + "') " +
                               "    OnMouseout=MouseIsOut('" + b2 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b2 + "Out.gif' ID='img" + 
                                    b2 + "' NAME='img" + b2 + "' BORDER='0' TITLE='" + t2 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" +
                               "</DIV>" ); 
            }

            if (b3 != "")
            {
               document.write( "<DIV ID='div" + b3 + "Link' NAME='div" + b3 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 2) + 
                               "px; left: " + ButtonLeft + "px'>" +
                               "   <A HREF='" + b3 + ".htm' OnMouseover=MouseIsOver('" + b3 + "') " +
                               "    OnMouseout=MouseIsOut('" + b3 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b3 + "Out.gif' ID='img" + 
                                    b3 + "' NAME='img" + b3 + "' BORDER='0' TITLE='" + t3 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" +
                               "</DIV>" ); 
            }

            if (b4 != "")
            {
               document.write( "<DIV ID='div" + b4 + "Link' NAME='div" + b4 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 3) + 
                               "px; left: " + ButtonLeft + "px'>" +
                               "   <A HREF='" + b4 + ".htm' OnMouseover=MouseIsOver('" + b4 + "') " +
                               "    OnMouseout=MouseIsOut('" + b4 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b4 + "Out.gif' ID='img" + 
                                    b4 + "' NAME='img" + b4 + "' BORDER='0' TITLE='" + t4 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" +
                               "</DIV>" ); 
            }

            if (b5 != "")
            {
               document.write( "<DIV ID='div" + b5 + "Link' NAME='div" + b5 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 4) + 
                               "px; left: " + ButtonLeft + "px'>" +
                               "   <A HREF='" + b5 + ".htm' OnMouseover=MouseIsOver('" + b5 + "') " +
                               "    OnMouseout=MouseIsOut('" + b5 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b5 + "Out.gif' ID='img" + 
                                    b5 + "' NAME='img" + b5 + "' BORDER='0' TITLE='" + t5 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" +
                               "</DIV>" );             }

            if (b6 != "")
            {
               document.write( "<DIV ID='div" + b6 + "Link' NAME='div" + b6 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 5) + 
                               "px; left: " + ButtonLeft + "px'>" +
                               "   <A HREF='" + b6 + ".htm' OnMouseover=MouseIsOver('" + b6 + "') " +
                               "    OnMouseout=MouseIsOut('" + b6 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b6 + "Out.gif' ID='img" + 
                                    b6 + "' NAME='img" + b6 + "' BORDER='0' TITLE='" + t6 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" +
                               "</DIV>" ); 
            }

            if (b7 != "")
            {
               document.write( "<DIV ID='div" + b7 + "Link' NAME='div" + b7 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 6) + 
                               "px; left: " + ButtonLeft + "px'>" +
                               "   <A HREF='" + b7 + ".htm' OnMouseover=MouseIsOver('" + b7 + "') " +
                               "    OnMouseout=MouseIsOut('" + b7 + "')>" +
                               "   <IMG SRC='" + drImages + "btn" + b7 + "Out.gif' ID='img" + 
                                    b7 + "' NAME='img" + b7 + "' BORDER='0' TITLE='" + t7 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'></A>" +
                               "</DIV>" ); 
            }
         }
      }
   }

   /* ******* */
   /* The menu size changes depending on the number of buttons that appear upon it. */
   /* Note: Even though the menu elements are reference by other parts of the document, I will keep all of the creation */
   /*       information within this and DrawMenu(). The buttons are positional.  Elements are based on variables. */
   /* FUTURE: Make the argument an array and loop through it? (I don't have the time now to learn how.)  Keep max to 7. */
   /* ******* */

   function DisabledMenuItems(n3D, cssTop, cssWidth, NumOfButtons, b1, t1, b2, t2, b3, t3, b4, t4, b5, t5, b6, t6, b7, t7)
   {
      if (NumOfButtons == 0)
      {
         // bye bye
      }
      else
      if (usesStyles)
      {
         var VScalingFactor = 0.75; // Scaling factors.
         var HScalingFactor = 0.75;
         // The button standard is 150 wide and 50 high (3:1), so their is no need to access their properties.
         var ButtonWidth = 150 * HScalingFactor; // Buttons do not have to maintain their original proportions.
         var ButtonHeight = 50 * VScalingFactor;
         var ButtonVSpacing = 15 * VScalingFactor;
         // The menu face is also 150 wide (and remains so, to ease calculations), however the menu is scaled in its height
         // depending on the number of buttons that will be placed on it, so use the button height scaling factor.
         var MenuHeightPadding = 45 * VScalingFactor;
         var MenuHeight = ButtonHeight * NumOfButtons + ButtonVSpacing * (NumOfButtons-1) + MenuHeightPadding * 2;
         var MenuLeftEdge = 30; // The menu is rotated so that it has its left edge showing, so use MenuFace in calcs. 
         var MenuFace = NavigationWidth - MenuLeftEdge; // This must be >7+ than the ButtonWidth to format correctly.
         var MenuWidthPadding = (MenuFace - ButtonWidth) / 2; 
         var MenuRotation = n3D * HScalingFactor; // The rotation should show a slight offset for a 3D effect.
         var ButtonLeft = MenuLeftEdge + MenuWidthPadding + MenuRotation; 

         // Maintain two different logo/menu systems until the best one becomes obvious. (Rect vs '', Stone vs Background)

         // Note: Block element names (lay*/div*/anc*) are here as documentation, and are not used outside of the funtion.
         //       However, they do exist in a safe format (ID/NAME), so are available out of the function (if ever needed).

         // Don't bother checking "NumOfButtons" with the "b" values.  It will be obvious to the developer/designer.

         if (usesLayers)
         {
            if (b1 != "")
            {
               document.write( "<LAYER ID='lay" + b1 + "Link' NAME='lay" + b1 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding) + "' LEFT='" + ButtonLeft + "'>" +
                               "   <IMG SRC='" + drImages + "btn" + b1 + "Disabled.gif' ID='img" + 
                                    b1 + "' NAME='img" + b1 + "' BORDER='0' TITLE='" + t1 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" + 
                               "</LAYER>" ); 
            }

            if (b2 != "")
            {
               document.write( "<LAYER ID='lay" + b2 + "Link' NAME='lay" + b2 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 1) + 
                               "' LEFT='" + ButtonLeft + "'>" +
                               "   <IMG SRC='" + drImages + "btn" + b2 + "Disabled.gif' ID='img" + 
                                    b2 + "' NAME='img" + b2 + "' BORDER='0' TITLE='" + t2 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" + 
                               "</LAYER>" ); 
            }

            if (b3 != "")
            {
               document.write( "<LAYER ID='lay" + b3 + "Link' NAME='lay" + b3 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 2) + 
                               "' LEFT='" + ButtonLeft + "'>" +
                               "   <IMG SRC='" + drImages + "btn" + b3 + "Disabled.gif' ID='img" + 
                                    b3 + "' NAME='img" + b3 + "' BORDER='0' TITLE='" + t3 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" + 
                               "</LAYER>" ); 
            }

            if (b4 != "")
            {
               document.write( "<LAYER ID='lay" + b4 + "Link' NAME='lay" + b4 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 3) + 
                               "' LEFT='" + ButtonLeft + "'>" +
                               "   <IMG SRC='" + drImages + "btn" + b4 + "Disabled.gif' ID='img" + 
                                    b4 + "' NAME='img" + b4 + "' BORDER='0' TITLE='" + t4 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" + 
                               "</LAYER>" ); 
            }

            if (b5 != "")
            {
               document.write( "<LAYER ID='lay" + b5 + "Link' NAME='lay" + b5 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 4) + 
                               "' LEFT='" + ButtonLeft + "'>" +
                               "   <IMG SRC='" + drImages + "btn" + b5 + "Disabled.gif' ID='img" + 
                                    b5 + "' NAME='img" + b5 + "' BORDER='0' TITLE='" + t5 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" + 
                               "</LAYER>" ); 
            }

            if (b6 != "")
            {
               document.write( "<LAYER ID='lay" + b6 + "Link' NAME='lay" + b6 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 5) + 
                               "' LEFT='" + ButtonLeft + "'>" +
                               "   <IMG SRC='" + drImages + "btn" + b6 + "Disabled.gif' ID='img" + 
                                    b6 + "' NAME='img" + b6 + "' BORDER='0' TITLE='" + t6 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" + 
                               "</LAYER>" ); 
            }

            if (b7 != "")
            {
               document.write( "<LAYER ID='lay" + b7 + "Link' NAME='lay" + b7 + "Link' TOP='" +
                                 eval(cssTop + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 6) + 
                               "' LEFT='" + ButtonLeft + "'>" +
                               "   <IMG SRC='" + drImages + "btn" + b7 + "Disabled.gif' ID='img" + 
                                    b7 + "' NAME='img" + b7 + "' BORDER='0' TITLE='" + t7 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" + 
                               "</LAYER>" ); 
            }
         }
         else
         if (usesDivs)
         {
            if (b1 != "")
            {
               document.write( "<DIV ID='div" + b1 + "Link' NAME='div" + b1 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding) + "px; left: " + 
                                         ButtonLeft + "px'>" +
                               "   <IMG SRC='" + drImages + "btn" + b1 + "Disabled.gif' ID='img" + 
                                    b1 + "' NAME='img" + b1 + "' BORDER='0' TITLE='" + t1 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" +
                               "</DIV>" ); 
            }

            if (b2 != "")
            {
               document.write( "<DIV ID='div" + b2 + "Link' NAME='div" + b2 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 1) + 
                               "px; left: " + ButtonLeft + "px'>" +
                               "   <IMG SRC='" + drImages + "btn" + b2 + "Disabled.gif' ID='img" + 
                                    b2 + "' NAME='img" + b2 + "' BORDER='0' TITLE='" + t2 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" +
                               "</DIV>" ); 
            }

            if (b3 != "")
            {
               document.write( "<DIV ID='div" + b3 + "Link' NAME='div" + b3 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 2) + 
                               "px; left: " + ButtonLeft + "px'>" +
                               "   <IMG SRC='" + drImages + "btn" + b3 + "Disabled.gif' ID='img" + 
                                    b3 + "' NAME='img" + b3 + "' BORDER='0' TITLE='" + t3 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" +
                               "</DIV>" ); 
            }

            if (b4 != "")
            {
               document.write( "<DIV ID='div" + b4 + "Link' NAME='div" + b4 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 3) + 
                               "px; left: " + ButtonLeft + "px'>" +
                               "   <IMG SRC='" + drImages + "btn" + b4 + "Disabled.gif' ID='img" + 
                                    b4 + "' NAME='img" + b4 + "' BORDER='0' TITLE='" + t4 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" +
                               "</DIV>" ); 
            }

            if (b5 != "")
            {
               document.write( "<DIV ID='div" + b5 + "Link' NAME='div" + b5 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 4) + 
                               "px; left: " + ButtonLeft + "px'>" +
                               "   <IMG SRC='" + drImages + "btn" + b5 + "Disabled.gif' ID='img" + 
                                    b5 + "' NAME='img" + b5 + "' BORDER='0' TITLE='" + t5 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" +
                               "</DIV>" );             }

            if (b6 != "")
            {
               document.write( "<DIV ID='div" + b6 + "Link' NAME='div" + b6 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 5) + 
                               "px; left: " + ButtonLeft + "px'>" +
                               "   <IMG SRC='" + drImages + "btn" + b6 + "Disabled.gif' ID='img" + 
                                    b6 + "' NAME='img" + b6 + "' BORDER='0' TITLE='" + t6 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" +
                               "</DIV>" ); 
            }

            if (b7 != "")
            {
               document.write( "<DIV ID='div" + b7 + "Link' NAME='div" + b7 + "Link'" +
                               " STYLE='position: absolute; top: " + 
                                         eval(cssTop + 10 + MenuHeightPadding + (ButtonHeight + ButtonVSpacing) * 6) + 
                               "px; left: " + ButtonLeft + "px'>" +
                               "   <IMG SRC='" + drImages + "btn" + b7 + "Disabled.gif' ID='img" + 
                                    b7 + "' NAME='img" + b7 + "' BORDER='0' TITLE='" + t7 + "'" +
                               "    WIDTH='" + ButtonWidth + "' HEIGHT='" + ButtonHeight + "'>" +
                               "</DIV>" ); 
            }
         }
      }
   }

   function CreateStylizedSummaries( cssTop, cssLeft, s0, s1, s2, s3, s4, s5, s6, s7 )
   {
      if (usesLayers)
      {
         if (s0 != "")
         {
            document.write( "<LAYER ID='laySummary' NAME='laySummary' " +
                            " TOP='" + cssTop + "' LEFT=" + cssLeft + "' VISIBILITY='hidden'>" );
            document.write( csSummary );
            document.write( "</LAYER>" );
         }

         cssCurrent = document.laySummary;

         if (s1 != "")
         {
            document.write( "<LAYER ID='lay" + s1 + "Summary' NAME='lay" + s1 + "Summary' " +
                            " TOP='" + cssTop + "' LEFT=" + cssLeft + "' VISIBILITY='hidden'>" );
            document.write( eval("csLatest" + s1) );
            document.write( "</LAYER>" );
         }


         if (s2 != "")
         {
            document.write( "<LAYER ID='lay" + s2 + "Summary' NAME='lay" + s2 + "Summary' " +
                            " TOP='" + cssTop + "' LEFT=" + cssLeft + "' VISIBILITY='hidden'>" );
            document.write( eval("csLatest" + s2) );
            document.write( "</LAYER>" );
         }

         if (s3 != "")
         {
            document.write( "<LAYER ID='lay" + s3 + "Summary' NAME='lay" + s3 + "Summary' " +
                            " TOP='" + cssTop + "' LEFT=" + cssLeft + "' VISIBILITY='hidden'>" );
            document.write( eval("csLatest" + s3) );
            document.write( "</LAYER>" );
         }

         if (s4 != "")
         {
            document.write( "<LAYER ID='lay" + s4 + "Summary' NAME='lay" + s4 + "Summary' " +
                            " TOP='" + cssTop + "' LEFT=" + cssLeft + "' VISIBILITY='hidden'>" );
            document.write( eval("csLatest" + s4) );
            document.write( "</LAYER>" );
         }

         if (s5 != "")
         {
            document.write( "<LAYER ID='lay" + s5 + "Summary' NAME='lay" + s5 + "Summary' " +
                            " TOP='" + cssTop + "' LEFT=" + cssLeft + "' VISIBILITY='hidden'>" );
            document.write( eval("csLatest" + s5) );
            document.write( "</LAYER>" );
         }

         if (s6 != "")
         {
            document.write( "<LAYER ID='lay" + s6 + "Summary' NAME='lay" + s6 + "Summary' " +
                            " TOP='" + cssTop + "' LEFT=" + cssLeft + "' VISIBILITY='hidden'>" );
            document.write( eval("csLatest" + s6) );
            document.write( "</LAYER>" );
         }

         if (s7 != "")
         {
            document.write( "<LAYER ID='lay" + s7 + "Summary' NAME='lay" + s7 + "Summary' " +
                            " TOP='" + cssTop + "' LEFT=" + cssLeft + "' VISIBILITY='hidden'>" );
            document.write( eval("csLatest" + s7) );
            document.write( "</LAYER>" );
         }
      }
      else
      if (usesDivs)
      {
         if (s0 != "")
         {
            document.write( "<DIV ID='divSummary' NAME='divSummary' " + 
                            " STYLE='position: absolute; top: " + 
                              cssTop + "px; left: " + cssLeft + "px; visibility: hidden'>" );
            document.write( csSummary );
            document.write( "</DIV>" );
         }

         cssCurrent = divSummary;

         if (s1 != "")
         {
            document.write( "<DIV ID='div" + s1 + "Summary' NAME='div" + s1 + "Summary' " + 
                            " STYLE='position: absolute; top: " + 
                              cssTop + "px; left: " + cssLeft + "px; visibility: hidden'>" );
            document.write( eval("csLatest" + s1) );
            document.write( "</DIV>" );
         }

         if (s2 != "")
         {
            document.write( "<DIV ID='div" + s2 + "Summary' NAME='div" + s2 + "Summary' " + 
                            " STYLE='position: absolute; top: " + 
                              cssTop + "px; left: " + cssLeft + "px; visibility: hidden'>" );
            document.write( eval("csLatest" + s2) );
            document.write( "</DIV>" );
         }

         if (s3 != "")
         {
            document.write( "<DIV ID='div" + s3 + "Summary' NAME='div" + s3 + "Summary' " + 
                            " STYLE='position: absolute; top: " + 
                              cssTop + "px; left: " + cssLeft + "px; visibility: hidden'>" );
            document.write( eval("csLatest" + s3) );
            document.write( "</DIV>" );
         }

         if (s4 != "")
         {
            document.write( "<DIV ID='div" + s4 + "Summary' NAME='div" + s4 + "Summary' " + 
                            " STYLE='position: absolute; top: " + 
                              cssTop + "px; left: " + cssLeft + "px; visibility: hidden'>" );
            document.write( eval("csLatest" + s4) );
            document.write( "</DIV>" );
         }

         if (s5 != "")
         {
            document.write( "<DIV ID='div" + s5 + "Summary' NAME='div" + s5 + "Summary' " + 
                            " STYLE='position: absolute; top: " + 
                              cssTop + "px; left: " + cssLeft + "px; visibility: hidden'>" );
            document.write( eval("csLatest" + s5) );
            document.write( "</DIV>" );
         }

         if (s6 != "")
         {
            document.write( "<DIV ID='div" + s6 + "Summary' NAME='div" + s6 + "Summary' " + 
                            " STYLE='position: absolute; top: " + 
                              cssTop + "px; left: " + cssLeft + "px; visibility: hidden'>" );
            document.write( eval("csLatest" + s6) );
            document.write( "</DIV>" );
         }

         if (s7 != "")
         {
            document.write( "<DIV ID='div" + s7 + "Summary' NAME='div" + s7 + "Summary' " + 
                            " STYLE='position: absolute; top: " + 
                              cssTop + "px; left: " + cssLeft + "px; visibility: hidden'>" );
            document.write( eval("csLatest" + s7) );
            document.write( "</DIV>" );
         }
      }
   }

   function DrawContent( whatContent, whatVisibility ) 
   {
      if (usesLayers)
      {
         document.layers["lay" + whatContent].visibility = whatVisibility;
      }
      else
      if (usesDivs)
      {
         document.all["div" + whatContent].style.visibility = whatVisibility;
      }
   }

   // The dividor is 15 wide and the nav/summary seperator is 100, so left of the dividor is (100/2)-(15/2) = 42.
   function DrawNavigationDividor( imgSource )
   {
      if (usesLayers)
      {
         document.write( "<LAYER TOP='10' LEFT='" + eval(NavigationWidth + 42) + "'>" +
                         "   <IMG SRC='" + drImages + imgSource + "' BORDER='0' ID='imgNavDividor' NAME='imgNavDividor' " +
                         "    WIDTH='15' HEIGHT='" + eval(window.innerHeight - 20) + "'>" +
                         "</LAYER>" );
      }
      else
      if (usesDivs)
      {
         // document.write( "<IMG SRC='" + drImages + imgSource + 
         //                   "' BORDER='0' ID='imgNavDividor' NAME='imgNavDividor' HEIGHT='" +
         //                   eval(document.body.offsetHeight - 20) + "' STYLE='{position: absolute; top:10; left:" + 
         //                   eval(NavigationWidth + 42)+ "}' WIDTH='15'>" );
        document.write( "<DIV ID='divNavDividor' NAME='divNavDividor' HEIGHT='" +
                          eval(document.body.offsetHeight - 16) + "' STYLE='position: absolute; top: 10px; left: " + 
                          eval(NavigationWidth + 42)+ "px' WIDTH='19'>" );
        document.write( "   <IMG SRC='" + drImages + imgSource + 
                            "' BORDER='0' ID='imgNavDividor' NAME='imgNavDividor' HEIGHT='" +
                            eval(document.body.offsetHeight - 20) + 
                            "' WIDTH='15'>" );
        document.write( "</DIV>" );
      }         
   }

   function DrawLogo( cssWidth )
   {
      if (usesLayers)
      {
         document.write( "<LAYER LEFT='10' WIDTH='" + NavigationWidth + "'>" +
                         "   <CENTER>" +
                         "   <A HREF='default.htm' OnMouseover=MouseIsOver('Logo') OnMouseout=MouseIsOut('Logo')>" +
                         "   <IMG SRC='" + drImages + "mrgLogo.jpg' BORDER='0' ID='imgLogo' NAME='imgLogo'" +
                         "    TITLE='HOME' WIDTH='" + cssWidth + "'></A>" +
                         "   </CENTER>" +
                         "</LAYER>" +
                         "<LAYER TOP='0' LEFT='0' WIDTH='20'>" +
                         "   <CENTER>" +
                         "   <A HREF='default.htm' OnMouseover=imgHome.src='" + drImages + "HomeOver.gif'" + 
                         "    OnMouseout=imgHome.src='" + drImages + "Home.gif'>" +
                         "   <IMG NAME='imgHome' ID='imgHome' SRC='" + drImages + "Home.gif' BORDER='0'" +
                         "    TITLE='HOME (Clicking on the logo is the same thing.)' HEIGHT='50'></A>" +
                         "   </CENTER>" +
                         "</LAYER>" );
      }
      else
      if (usesDivs)
      {
         document.write( "<DIV STYLE='position: absolute; left:10px; width:" + NavigationWidth + "px'>" +
                         "   <CENTER>" +
                         "   <A HREF='default.htm' OnMouseover=MouseIsOver('Logo') OnMouseout=MouseIsOut('Logo')>" +
                         "   <IMG SRC='" + drImages + "mrgLogo.jpg' BORDER='0' ID='imgLogo' NAME='imgLogo'" +
                         "    TITLE='HOME' WIDTH='" + cssWidth + "'></A>" +
                         "   </CENTER>" +
                         "</DIV>" +
                         "<DIV STYLE='position: absolute; top:0px; left:0px; width:20px'>" +
                         "   <CENTER>" +
                         "   <A HREF='default.htm' OnMouseover=imgHome.src='" + drImages + "HomeOver.gif'" +
                         "    OnMouseout=imgHome.src='" + drImages + "Home.gif'>" +
                         "   <IMG NAME='imgHome' ID='imgHome' SRC='" + drImages + "Home.gif' BORDER='0'" +
                         "    TITLE='HOME (Clicking on the logo is the same thing.)' HEIGHT='50px'></A>" +
                         "   </CENTER>" +
                         "</DIV>" );
      }         
   }

   function DrawWhatPage( cssTop, cssWidth, imgName )
   {
      if (usesStyles)
      {
         var scaFactor = 0.65;

         VSizeOfWhatPage = 62 * scaFactor; // Text height + height of image = 62.

         if (usesLayers)
         {
            document.write( "<LAYER HEIGHT='" + VSizeOfWhatPage + "' WIDTH='" + 
                              cssWidth + "' LEFT='10' TOP='" + cssTop + "'>" +
                            "   <CENTER>" +
                            "   <FONT COLOR='#F1E6C6' SIZE='-1'>Current Page:</FONT><BR>" +
                            "   <LAYER LEFT='" + eval((cssWidth * (1.00 - scaFactor)) / 2) + 
                                 "' WIDTH='" + eval(cssWidth * scaFactor) + 
                                 "' HEIGHT='" + eval(50 * scaFactor) + "'>" +
                            "   <IMG SRC='" + drImages + "btn" + imgName + "Over.gif' BORDER='0' WIDTH='" + 
                                 eval(cssWidth * scaFactor ) + "' TITLE='" + imgName + "'>" +
                            "   </LAYER>" +
                            "   </CENTER>" +
                            "</LAYER>" );
         }
         else
         if (usesDivs)
         {
            document.write( "<DIV STYLE='position: absolute; height:" + VSizeOfWhatPage + "px; width:" + 
                              cssWidth + "px; left:10px; top:" + cssTop + "px'>" +
                            "   <CENTER>" +
                            "      <FONT COLOR='#F1E6C6' SIZE='-1'>Current Page:</FONT><BR>" +
                            "      <IMG SRC='" + drImages + "btn" + imgName + "Over.gif' BORDER='0' WIDTH='" + 
                                    eval(cssWidth * scaFactor) + "' TITLE='" + imgName + "'>" +
                            "   </CENTER>" +
                            "</DIV>" );
         }
      }
   }

   function DrawCopyrights( cssTop, cssWidth )
   {
      if (usesLayers)
      {
         // Not using from bottom because looks unbalanced: eval(window.innerHeight - 50) + "'>" +

         document.write( "<LAYER WIDTH='" + cssWidth + "' LEFT='10' TOP='" + cssTop + "'>" +
                         "   <FONT COLOR='#F1E6C6' SIZE='-1'>&copy; 2000 MicroRealities</FONT>" +
                         "</LAYER>" );
      }
      else
      if (usesDivs)
      {
         // Not using from bottom because looks unbalanced: eval(document.body.offsetHeight - 50) + "}'>" +

         document.write( "<DIV STYLE='position: absolute; width:" + cssWidth + "px; left:10px; top:" + cssTop + "px'>" +
                         "   <FONT COLOR='#F1E6C6' SIZE='-1'>&copy; 2000 MicroRealities</FONT>" +
                         "</DIV>" );
      }
   }
