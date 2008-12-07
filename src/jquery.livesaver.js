/*
 LiveSaver -- Saves lifes.
 Copyright 2006-2008 Jan Lehnardt <jan@apache.org>
 
 TODO: store and read from and to cookie
*/

(function($) {
    $.livesaver = $.livesaver || {};
    $.livesaver.pageKey = window.location.href;

    // public api

    $.livesaver.setPageKey = function(pageKey) {
        $.livesaver.pageKey = pageKey;
    }

    $.fn.livesaver = function(reset) {
        return this.each(function() {
            if(reset) {
               ls_reset(this);
            } else { 
               ls_register(this);
            }
        });
    }

    // private api
    
    var session = {};

    function ls_reset(element) {
        alert("reset " + element);
    }

    function ls_register(element) {

        var element_value = store.get(element);
        if(element_value) {
            $(element).val(element_value);
        }

        $(element).keyup(function() {
            store.set(element, element_value);
        });
    }

    function key(element) {
        return "LSB:" + $.livesaver.pageKey;
    }

    var store = {
        data: {},

        set: function(element) {
            var cookie_data = $.cookie(key());

            if(cookie_data) {
                store.data = $.json2.parse_partial(cookie_data);
            }
            store.data[element.id] = $(element).val();
            $.cookie(key(), $.json2.stringify(this.data), {
                expires: 10000 //days
            });
        },

        get: function(element) {
            store.data = $.json2.parse_partial($.cookie(key()), {});
            if(store.data && store.data[element.id]) {
                return store.data[element.id];
            }
            return "";
        },
    }

})(jQuery);