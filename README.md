dyntable
========

DynTable offers a lightweight, simplistic approach to rendering HTML tables for jQuery fans. It doesn't do inline editing or auto saving. It just renders (and, if you're into that, dynamically updates), an HTML table. It works great as a dynamic queue! No fluff, just simplicity.

To use the plugin:
<pre>
<code>
  $('#queue-container').dyntable({dataUrl: 'http://<server>/queue/current?format=json'})
</code>
</pre>
In this example, when the plugin initializes it will retrieve data using an AJAX request with the dataUrl parameter as a target for the JSON source. It will then render an HTML table using that data into the DOM element to which the plugin's behaviour is bound.

The plugin can be configured to dynamically update the table as the data changes:
<pre>
<code>
  $('#queue-container').dyntable({
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
          table: ['queue-table', 'table-table], // first selector set as element id of <table>, others as classes
          row: ['queue-row', 'table-row'] // all added as classes to <tr>
        }
      </code></pre>
    </td>
    <td>Adds classes to each HTML element; multiple classes can be added (as show), but the firt in the list is set as the primary selector and is used internally for DOM manipulation</td>
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
    <td>Specifies the data, as an object, to be rendered; set the <i>headers</i> nested object to <i>null</i> to render a table without column headers</td>
  </tr>
</table>

That's it. Told you it was simple.
