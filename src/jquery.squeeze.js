/*!
 * jquery.squeeze.js v1.0.1 (2013-02-12)
 * 
 * Copyright 2013 Massimo Lombardo (@unwiredbrain)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function ($) {


    "use strict";


    function Squeeze(selector, options) {
        this.options = options;
        this.init(selector);
    }


    Squeeze.prototype.init = function(selector) {
        var that = this;
        that.$menu = $(selector).addClass(that.options.menuClass);
        that.$select = $("<select/>", {
            "class": that.options.selectClass
        }).insertAfter(that.$menu).on("change", function () {
            window.location = $(this).find("option:selected").val();
        });
        $("a", that.$menu).each(function () {
            var $this = $(this),
                isActive = $this.parent().hasClass(that.options.activeClass),
                text = isActive ? that.options.activeText.toString().replace(/\{placeholder\}/g, $this.text()) : $this.text();
            $("<option/>", {
                "selected": isActive,
                "value"   : $this.attr("href"),
                "text"    : text
            }).appendTo(that.$select);
        });
        return that;
    };


    Squeeze.prototype.destroy = function() {
        var that = this;
        that.$menu.removeClass(that.options.menuClass);
        that.$select.remove();
        return that;
    };


    $.fn.squeeze = function (options) {
        options = $.extend({}, {
            "activeText": "{placeholder}",
            "activeClass": "active",
            "menuClass": "hidden-phone",
            "selectClass": "visible-phone"
        }, options || {});
        return this.each(function () {
            $.data(this, "squeeze", new Squeeze(this, options));
        });
    };


}(jQuery));
