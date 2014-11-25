dyntable
========

Simple jQuery plugin to do dynamic &lt;table> rendering and dynamic updates of the &lt;tr> from JSON source

The plugin offers a lightweight, simplistic approach to rendering HTML tables. To use the plugin:

<code>
  $('queue-table').dyntable({dataUrl: 'http://<server>/queue/current?format=json'})
</code>

When the plugin initializes, it will attempt to retrieve and render data using the dataUrl parameter as a source for JSON data. This allows for asynchronous fetching of the tabular data and rendering. In the background, the table will execute an AJAX GET request in a synchronous request. The affect is an a synchronous request that occurs after the DOM loads. The affect is the same as an asynchronous request.

If the data is already available, the plugin can use an existing data object rather than fetching it:

<code>

</code>
