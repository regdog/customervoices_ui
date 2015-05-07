jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("ctu.blue.customervoice.page", {

	onInit: function(evt) {
		var jsonModel = new sap.ui.model.json.JSONModel();
		var data = {
			voices: [
				{
					title: "Singapore Customs detains 700 counterfeit bags and wallets from China",
					description: "SINGAPORE — A total of 700 counterfeit women’s bags and wallets imported from China were detained by Singapore Customs during an inspection of the consignment of goods at Tanjong Pagar Distripark earlier today (May 6).",
					votes: 2,
					category: "Bootcamp Ideas"
				}, {
					title: "Libya's coast guard detains almost 600 African migrants",
					description: "TRIPOLI - Libya's coast guard detained on Wednesday almost 600 illegal African migrants, among them pregnant women and 18 children, who had tried to sail to Europe on a fishing boat, a security official said.",
					votes: 1,
					category: "Bootcamp Materials"
				}, {
					title: "Salman Khan: Bollywood star bailed for two days in hit-and-run case",
					description: "The Bombay high court gave him interim bail for two days after his lawyers filed an appeal against his sentence. The appeal will be heard on Friday. On Wednesday morning, a sessions court sentenced the actor to five years in prison for killing a homeless man.",
					votes: 4,
					category: "Bootcamp Schedule"
				}, {
					title: "Libya's coast guard detains almost 600 African migrants",
					description: "TRIPOLI - Libya's coast guard detained on Wednesday almost 600 illegal African migrants, among them pregnant women and 18 children, who had tried to sail to Europe on a fishing boat, a security official said.",
					votes: 1,
					category: "Bootcamp Materials"
				}, {
					title: "Salman Khan: Bollywood star bailed for two days in hit-and-run case",
					description: "The Bombay high court gave him interim bail for two days after his lawyers filed an appeal against his sentence. The appeal will be heard on Friday. On Wednesday morning, a sessions court sentenced the actor to five years in prison for killing a homeless man.",
					votes: 4,
					category: "Bootcamp Schedule"
				}, {
					title: "Libya's coast guard detains almost 600 African migrants",
					description: "TRIPOLI - Libya's coast guard detained on Wednesday almost 600 illegal African migrants, among them pregnant women and 18 children, who had tried to sail to Europe on a fishing boat, a security official said.",
					votes: 1,
					category: "Bootcamp Materials"
				}, {
					title: "Salman Khan: Bollywood star bailed for two days in hit-and-run case",
					description: "The Bombay high court gave him interim bail for two days after his lawyers filed an appeal against his sentence. The appeal will be heard on Friday. On Wednesday morning, a sessions court sentenced the actor to five years in prison for killing a homeless man.",
					votes: 4,
					category: "Bootcamp Schedule"
				}
			]
		};

		// sort in json data
		// data.voices.sort(function(a, b) {
		// return parseFloat(b.votes) - parseFloat(a.votes);
		// });

		// set table model
		jsonModel.setData(data);
		this.getView().byId('idVoiceTable').setModel(jsonModel);

		// sort the model
		// var oSorter = new sap.ui.model.Sorter("votes", true);
		// this.getView().byId('idVoiceTable').getBinding("items").sort(oSorter);
	},

	onNavBtnPress: function() {
		alert('sdf');
	},

	onLikePress: function(evt) {
		var votes = evt.getSource().getBindingContext().getProperty("votes");
		var sPath = evt.getSource().getBindingContext().getPath();
		var oModel = this.getView().byId('idVoiceTable').getModel();
		oModel.setProperty(sPath + "/votes", votes + 1);
		oModel.refresh();
	},

	onDislikePress: function(evt) {
		var votes = evt.getSource().getBindingContext().getProperty("votes");
		var sPath = evt.getSource().getBindingContext().getPath();
		var oModel = this.getView().byId('idVoiceTable').getModel();
		oModel.setProperty(sPath + "/votes", votes - 1);
		oModel.refresh();
	},

	onSorterSelect: function(evt) {
		var selected = evt.getSource().getSelected();
		if (selected) {
			var oSorter = new sap.ui.model.Sorter("votes", true);
			this.getView().byId('idVoiceTable').getBinding("items").sort(oSorter);
		} else {
			var oTableBinding = this.getView().byId('idVoiceTable').getBinding("items");
			console.log(oTableBinding);
			oTableBinding.aSorters = [];
			oTableBinding.update();
			this.getView().byId('idVoiceTable').getModel().refresh();
		}
	},

	onRadioButtonSelect: function(evt) {
		var sIndex = evt.getSource().getSelectedIndex();
		var oTable = this.getView().byId('idVoiceTable');
		var oTableBinding = oTable.getBinding("items");
		switch (sIndex) {
			case 0:
				oTableBinding.filter();
				break;
			case 1:
				var filter = new sap.ui.model.Filter("category", "EQ", "Bootcamp Ideas");
				oTableBinding.filter([
					filter
				]);
				break;
			case 2:
				var filter = new sap.ui.model.Filter("category", "EQ", "Bootcamp Materials");
				oTableBinding.filter([
					filter
				]);
				break;
			case 3:
				var filter = new sap.ui.model.Filter("category", "EQ", "Bootcamp Schedule");
				oTableBinding.filter([
					filter
				]);
				break;
		}
	},

	onFormRadioButtonSelect: function(evt) {
		var sIndex = evt.getSource().getSelectedIndex();
		switch (sIndex) {
			case 0:
				this.getView().byId('idCategoryInput').setValue("Bootcamp Ideas");
				break;
			case 1:
				this.getView().byId('idCategoryInput').setValue("Bootcamp Materials");
				break;
			case 2:
				this.getView().byId('idCategoryInput').setValue("Bootcamp Schedule");
				break;
		}
	},

	onSubmitVoice: function() {
		var oModel = this.getView().byId('idVoiceTable').getModel();
		var sTitle = this.getView().byId('idTitleInput').getValue();
		var sDescription = this.getView().byId('idDescriptionInput').getValue();
		var sCategory = this.getView().byId('idCategoryInput').getValue();

		var oNewVoice = {
			title: sTitle,
			description: sDescription,
			votes: 0,
			category: sCategory
		};
		oVoices = oModel.getProperty("/voices");
		oVoices.unshift(oNewVoice);
		oModel.setProperty("/voices", oVoices);
		this._resetVoiceForm();
		sap.m.MessageToast.show("Your voice is submitted successfully!");
	},

	_resetVoiceForm: function() {
		this.getView().byId('idTitleInput').setValue("");
		this.getView().byId('idDescriptionInput').setValue("");
		this.getView().byId('idCategoryInput').setValue("Bootcamp Ideas");
	}
});
