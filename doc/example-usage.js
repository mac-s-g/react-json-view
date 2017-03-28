
import ReactJson from 'react-json-view';

//you have some json to display
let my_important_json = {
    test: 'this is a test string',
    another_sibling: 45,
    basic_array: [1, 2, 3],
    how_will_floats_do: -2.757,
    parent: {
        sibling1: true,
        sibling2: false,
        sibling3: null,
        sibling4: 'test',
        'last-sibling': {
            grand_child: NaN,
            'grand-child-func': (a) => {
                let b = 5;
                return a.push(b);
            }
        }
    },
    number: 1234
}

//so put it on the page!
<ReactJson src={my_important_json} />


//----------------------------------------------------------------


// ES6 with React
import ReactJson from 'react-json-view';

...
<ReactJson src={my_important_json} />
...


//----------------------------------------------------------------


<!-- Plain old script tag -->
<html >
...
<script src="https://unpkg.com/react@15/dist/react.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
<script src="https://unpkg.com/react-json-view"></script>
<script type="text/javascript">
  // reactJsonView is a global variable
  var jsonView = new reactJsonView.default({
    src: {test:true}
  });
  ReactDOM.render(
    jsonView.render(),
    document.getElementById('app-container')
  );
</script>
...
</html>