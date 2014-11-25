dyntable
========

Simple jQuery plugin to do dynamic &lt;table> rendering and dynamic updates of the &lt;tr> from JSON source

The plugin offers a lightweight, simplistic approach to rendering HTML tables. To use the plugin:

<code>
  $('queue-table').dyntable({dataUrl: 'http://<server>/queue/current?format=json'})
</code>

When the plugin initializes, it will attempt to retrieve and render data using the dataUrl parameter as a source for JSON data. This allows for asynchronous fetching of the tabular data and rendering. In the background, the table will execute an AJAX GET request synchronously.

If the data is already available, the plugin can use an existing data object rather than fetching it:
<p>
<code>
  $('queue-table').dyntable({
                        data:{
                          headers: ['header 1', 'header 2'], 
                          rows: [
                                  ['Fred', 1],
                                  ['Ray',2']
                                ]
                    });
</code>
</p>
The plugin's behaviour can also be customized. To dynamically update the table as the data changes:

<code>
  $('queue-table').dyntable({
                      dynamicUpdate:{
                        enabled: true,
                        interval: 5000 // 5 seconds between polling requests
                       }},
                     dataUrl: 'http://<server>/queue/current?format=json'
                  });
</code>

This behaviour assumes the data from source is of higher priroity than the data in UI and will update the UI to reflect the data.

Other parameters can be configured as well:

<table>
  <tr><th>Parameter</th><th>Example Value</th><th>Description</th></tr>
  <tr>
    <td>selector</td>
    <td></td>
    <td></td>
  </tr>
</table>
