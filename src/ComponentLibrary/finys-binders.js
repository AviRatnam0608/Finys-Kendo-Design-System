kendo.data.binders.widget.dialogOpen = kendo.data.Binder.extend({
    init: function (widget, bindings, options) {
      kendo.data.Binder.fn.init.call(
        this,
        widget.element[0],
        bindings,
        options
      );
    },
    refresh: function () {
      var that = this;
      var value = that.bindings["dialogOpen"].get();
      var dialog = $(that.element).data("kendoDialog");

      if (value) {
        dialog.open();
      } else {
        dialog.close();
      }
    },
  });
kendo.data.binders.widget.isSelected = kendo.data.Binder.extend({
    refresh: function () {
    const value = this.bindings["isSelected"].get();
    if (!value?.id) {
        $(this.element.element)
        .closest(".f-dropdown.k-picker")
        .removeClass("f-selected");
    } else {
        $(this.element.element)
        .closest(".f-dropdown.k-picker")
        .addClass("f-selected");
    }
    },
});

kendo.data.binders.widget.timepickerIsSelected = kendo.data.Binder.extend({
    refresh: function () {
    const value = this.bindings["timepickerIsSelected"].get();
    if (!value) {
        $(this.element.element)
            .closest('span.f-timepicker')
            .removeClass("f-selected");
    } else {
        $(this.element.element)
            .closest('span.f-timepicker')
            .addClass("f-selected");
    }
    },
});