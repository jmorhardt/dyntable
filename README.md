dyntable
========

Simple jQuery plugin to do dynamic &lt;table> rendering and dynamic updates of the &lt;tr> from JSON source

The plugin offers a lightweight, simplistic approach to rendering HTML tables. To use the plugin:
<pre>
<code>
  $('queue-table').dyntable({dataUrl: 'http://<server>/queue/current?format=json'})
</code>
</pre>
In this example, when the plugin initializes it will retrieve data using an AJAX request with the dataUrl parameter as a target for the JSON source. It will then render an HTML table using that data into the DOM element to which the plugin's behaviour is bound.

The plugin can be configured to dynamically update the table as the data changes:
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
This behaviour assumes the data from source is of higher priroity than the data in the UI and will update the UI to reflect the data.

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

Have fun!
