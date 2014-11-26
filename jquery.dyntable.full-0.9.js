(function($){
    $.fn.dyntable = function(options){
        // validate the plugin options before continuing
        if(!options){
            console.log('You must either specify data as "data:{header: <header data>, rows: <rows data>}" or provide a data source using the dataUrl parameter.');
            return;
        }
        if(options &&
            !options.dataUrl &&
            !options.data){
            console.log('You must either specify data as "data:{header: <header data>, rows: <rows data>}" or provide a data source using the dataUrl parameter.');
            return;
        }
        if(options &&
            options.dynamicUpdate.enabled == true &&
            ( options.dataUrl == '' ||
                options.dataUrl == undefined )){
            console.log('You requested the table update dynamically but did not specify a data source. Use the dataUrl parameter to define a data source.');
            return;
        }
        if(options &&
            options.dynamicUpdate.enabled == true &&
            ( options.dynamicUpdate.interval == null ||
                options.dynamicUpdate.interval == undefined ||
                options.dynamicUpdate.interval == '')){
            console.log('You requested the table update dynamically but did not specify an update interval. Use the dynamicUpdate.interval parameter to define an update interval.');
            return;
        }

        var container = this;

        var settings = $.extend({
            selector: {container: '#' + container[0].id, table: '#queue-table', row: '.queue-row'},
            dynamicUpdate: {enabled: false, interval: null},
            dataUrl: null,
            data: {header: null, rows: null}
        }, options);

        var manager = {

            pontificate: function(){
                // fetch and set new data
                helpers.setData(helpers.getData, helpers._setData, settings);

                var rowsInUI = $(settings.selector.table).find(settings.selector.row);

                // data is returned already ordered correctly, so we just need to re-render
                $.each(settings.data.rows, function(k,v){
                    var rowHtml = manager.buildRow(v, k+1);

                    // if this is a new row, add them at end
                    if(k > rowsInUI.length-1){
                        $(settings.selector.table).find('tr').last().after(rowHtml).fadeIn();
                        return;
                    }

                    // compare the current row in UI with corresponding data in obj
                    // if the UI row is not the same as data, render the data and un-render the UI row
                    if(v.id != rowsInUI[k].id){
                        $(rowsInUI[k]).before(rowHtml);
                        $(rowsInUI[k]).remove();
                    }
                });

                // remove any leftovers from UI
                $.each(rowsInUI, function(k, v){
                    if(k > settings.data.rows.length-1){
                        $(v).remove();
                    }
                });
            },

            buildTable: function(tableData){
                var html = '';
                html += '<table id="' + settings.selector.table.split('#')[1] + '">';
                if(tableData.header) html += this.buildHeader(tableData.header);
                $.each(tableData.rows, function(k,v){
                    html += manager.buildRow(v, k+1);
                });
                html += '</table>';

                return html;
            },

            buildTableTag: function(){
                return '<table class="' + settings.selector.table + '"></table>';
            },

            buildHeader: function(headerData){
                var html = '<tr>';
                $.each(headerData, function(k,v){
                    html+= '<th>' + v + '</th>'
                })
                html += '</tr>';
                return html;
            },

            buildRow: function(rowData, rowNumber){
                var html = '<tr class="' + settings.selector.row.split('.')[1] + '" id="' + rowData.id + '">';

                // if a row number is supplied, add to beginning of row
                if(rowNumber != null){
                    html += '<td class="rowNumber">' + rowNumber + '</td>';
                }

                $.each(rowData, function(k,v){
                    // id property of a dataset is assumed excluded
                    if(k != 'id'){
                        html+= '<td class="' + k + '">' + v + '</td>'
                    }
                })
                html += '</tr>';
                return html;
            }
        }

        var helpers = {
            getData: function(callback, url, obj){
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    contentType:"application/json; charset=utf-8",
                    async: false,
                    success: function(response){
                        callback(response, obj);
                    },
                    error: function(response){
                        console.log('There was an error processing the request to ' + url);
                    }
                });
            },

            setData: function(dataGetter, callback, obj){
                dataGetter(callback, obj.dataUrl, obj);
            },

            _setData: function(data, obj){
                settings.data.rows = data.rows;
            }
        }

        function bind(){
            // fetch and set data
            if(settings.data.rows == null) helpers.setData(helpers.getData, helpers._setData, settings);

            //render the table
            render();

            if(settings.dynamicUpdate.enabled == true){
                var int = 0;
                setInterval(function(){
                    if(int == 0) manager.pontificate(false);
                    else manager.pontificate(true);
                    int++;
                }, settings.dynamicUpdate.interval)
            }
        }

        function render(){
            // render the rows into the table based on the data
            $(settings.selector.container).html(manager.buildTable(settings.data));
        }

        // run the constructor
        bind();

        return this;
    }
}(jQuery));
