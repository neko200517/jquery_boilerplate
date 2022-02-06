import $ from './lib/_jquery-with-plugins';
import 'bootstrap';
import '../css/style.scss';
import startup from './lib/_startup';

//------------------------------------------------------------------//

$(() => {
  startup();
});
