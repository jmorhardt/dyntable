dyntable
========

Simple jQuery plugin to do dynamic &lt;table> rendering and dynamic updates of the &lt;tr> from JSON source

The plugin offers a lightweight, simplistic approach to rendering HTML tables. To use the plugin:

<code>
  $('queue-table').dyntable({dataUrl: 'http://<server>/queue/current?format=json'})
</code>

When the plugin initializes, it will attempt to retrieve and render data using the dataUrl parameter as a source for JSON data. This allows for asynchronous fetching of the tabular data and rendering. In the background, the table will execute an AJAX GET request synchronously.

If the data is already available, the plugin can use an existing data object rather than fetching it:
<pre>
<code>
  $('queue-table').dyntable({
                        data:{
                          headers: ['header 1', 'header 2'], 
                          rows: [
                                  ['Fred', 1],
                                  ['Ray',2']
                                ]
                        }
                    });
</code>
</pre>
The plugin's behaviour can also be customized. To dynamically update the table as the data changes:
<pre>
<code>
  $('queue-table').dyntable({
                      dynamicUpdate:{
                        enabled: true,
                        interval: 5000 // 5 seconds between polling requests
                       }},
                     dataUrl: 'http://<server>/queue/current?format=json'
                  });
</code>
</pre>
This behaviour assumes the data from source is of higher priroity than the data in UI and will update the UI to reflect the data.

Other parameters can be configured as well:

<table>
  <tr><th>Parameter</th><th>Example Value</th><th>Description</th></tr>
  <tr>
    <td>selector</td>
    <td>
      <pre><code>
        {
          table: 'queue-table',
          row: 'queue-row'
        }
      </code></pre>
    </td>
    <td>Adds class to each HTML element; used internally for DOM manipulation; default values as shown on left</td>
  </tr>
  <tr>
    <td>dynamicUpdate</td>
    <td>
      <pre><code>
        {
          enabled: true,
          interval: 5000
        }
      </code></pre>
    </td>
    <td>Allows table to be updated dynamically at a specified interval; if enabled, the dataUrl parameter (see below), is required</td>
  </tr>
  <tr>
    <td>dataUrl</td>
    <td>
      <pre><code>
          dataUrl: 'http://<server>/queue/current?format=json'
      </code></pre>
    </td>
    <td>Specifies the JSON source (required JSON format) from which the table data is rendered</td>
  </tr>
  <tr>
    <td>data</td>
    <td>
      <pre><code>
          {
            headers: ['header 1', 'header 2'], 
            rows: [
                    ['Fred', 1],
                    ['Ray',2']
                  ]
          }
      </code></pre>
    </td>
    <td>Specifies the data, as an object, to be rendered</td>
  </tr>
</table>
