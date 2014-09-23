enyo.kind({
	name: "App",
	classes: "enyo-fit",
	layoutKind: "FittableRowsLayout",style: "padding: 8px",
	licenseAccepted: false,
	components:[
		{name: "OpacityAnimator", kind: "Animator", startValue: 1, endValue: 0, duration: 1500, onStep: "animatorStep", onEnd: "animatorEnd"},
		{name: "panel", kind: "enyo.Panels", fit: true, components:[
			{kind: "enyo.FittableRows",  components:[
				{kind: "Scroller", fit: true, touch: true, horizontal: "hidden", components:[
					{kind: "PortsHeader",
					title: "License Agreement",
					style: "height: 42px;",
					taglines: [
						"You're definitely going to read this, right?",
						"Lots of text!",
						"FOSS!",
						"Scroll scroll scroll scroll tap.",
						"Will you take the red pill, or the green pill?"
				]},
					{content: licenseContent, allowHtml: true, style: "padding: 10px; color: white;"}
				]},
				{tag: "div", style: "margin: 8px 8% 0 8%; padding: 0; line-height: 42px;", layoutKind: "FittableColumnsLayout", components:[
			{name: "DeclineButton",
			kind: "onyx.Button",
			style: "width: 45%; color: white; background-color: darkred;",
			content: "Decline",
			ontap: "declineLicense"},
			{fit: true},
			{name: "AcceptButton",
			kind: "onyx.Button",
			style: "width: 45%;color: white; background-color: green;",
			content: "Accept",
			ontap: "acceptLicense"}
		]}
			]},
			
			{kind: "enyo.FittableRows", components: [
				{kind: "PortsHeader",
					title: "Feeds select",
					style: "height: 42px;",
					taglines: [
						"You're definitely going to read this, right?",
						"Lots of text!",
						"FOSS!",
						"Are you brave enough for Alpha",
						"Will you take the red pill, or the green pill?"
					]},
				{content: " Please Select a Feed  ", style: "text-align: center; color: white;"},
				{content: " ", style: "text-align: center; height: 10%;"},
				{kind: "enyo.FittableColumns", fit: true, components: [
					{content: " ", style: "width: 20%;"},
					{fit: true, content: "RadioGroup",components: [
						{kind: "onyx.RadioGroup", style: "width: 100%;", onActivate:"radioActivated", components: [
							{content: "Alpha feed", style: "width: 33.3%;", active: true},
							{content: "Beta feed" , style: "width: 33.3%;"},
							{content: "Release feed", style: "width: 33.3%;"}
						]},
					]},
					{content: " ", style: "width: 20%;"},
				]},
				{content: " ", style: " height: 20%;"},
			]},	
		]}
	],
	rendered: function(inSender, inEvent) {
		//Not using Cordova deviceready because it doesn't appear to work in MinimalUI
		this.inherited(arguments);
		this.$.panel.setIndex(0);
		this.$.OpacityAnimator.setStartValue(0);
		this.$.OpacityAnimator.setEndValue(1);
		var storedThis = this;
		setTimeout(function() { storedThis.$.OpacityAnimator.play(); }, 1000);
	},
	acceptLicense: function(inSender, inEvent) {
		this.licenseAccepted = true;
		this.$.DeclineButton.setDisabled(true);
		this.$.AcceptButton.setDisabled(true);
		this.$.OpacityAnimator.setStartValue(1);
		this.$.OpacityAnimator.setEndValue(0);
		this.$.panel.setIndex(1);
	},
	declineLicense: function(inSender, inEvent) {
		this.$.DeclineButton.setDisabled(true);
		this.$.AcceptButton.setDisabled(true);
		this.$.OpacityAnimator.setStartValue(1);
		this.$.OpacityAnimator.setEndValue(0);
		var storedThis = this;
		setTimeout(function() { storedThis.$.OpacityAnimator.play(); }, 1000);
	},
	animatorStep: function(inSender, inEvent) {
		enyo.Arranger.opacifyControl(this, inSender.value);
		this.addStyles("-webkit-transform: scale3d(" + ((inSender.value/2) + 0.5) + "," + ((inSender.value/2) + 0.5) + ",0);");
	},
	animatorEnd: function(inSender, inEvent) {
		if(this.$.OpacityAnimator.endValue == 0) {
			if(this.licenseAccepted == true) {
				/* this will create the needed /var/luna/preferences/ran-first-use file to start
				 * LunaSysMgr in lunaui mode */
				PalmSystem.markFirstUseDone();

				/* closing the main window will force the app to be closed */
				window.close();
			}
			else {
				//Shutdown device
				var request = navigator.service.Request("luna://com.palm.power/shutdown/",
				{
					method: "machineOff",
					parameters: {reason: "First Use Declined."},
				});
			}
		}
		else {
			//Remove transform, blocks input otherwise
			this.addStyles("-webkit-transform: scale3d();");
		}
	},
	radioActivated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			console.log(inSender, inEvent);
			if(inEvent.originator.getContent() === "Alpha feed"){	
				// TODO SET FEED TYPE HERE
			}	
			if(inEvent.originator.getContent() === "Beta feed")	{
				// TODO SET FEED TYPE HERE
			}	
			if(inEvent.originator.getContent() === "Release feed"){	
				// TODO SET FEED TYPE HERE
			}
		}
		var storedThis = this;
		setTimeout(function() { storedThis.$.OpacityAnimator.play(); }, 1000);
	
	}
});