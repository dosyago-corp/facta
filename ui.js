import {defd,undfd} from './utils.js';
import math from './math.js';
import {R,X} from './r.js';

const cells = {};
const factors = {};
let cellId = 1;

  const HeadRow = ({Q}) => R`<tr class=head><th></th>${Q.map((qi,i) => X`<th>${qi}</th>`)}</tr>`;
  const InnerRow = ({Q,P,row}) => R`${{key:`inner=${row}`}}
    <tr>
      <td><strong>${P[row]}<strong></td>
      ${Q.map((qi,col) => X`${{key:`inner-${row}-${qi}-${col}`}}<td>${P[row]*qi}</td>`)}
    </tr>
  `;
    

  function Table(problem) {
    const {n,p,q} = problem;
    const N = [...n.toString()];
    const P = [...p.toString()];
    const Q = [...q.toString()].reverse();
    console.log(Q);
    const hr = HeadRow({Q});
    console.log(hr);
    Object.assign(self,{hr});
    return R`
      <table>
        <thead>
          ${hr}
        </thead>
        <tbody>
          ${P.map((_,row) => InnerRow({Q,P,row}))}
        </tbody>
      </table>
    `;
  }

  function recalculate(state) {
    if ( defd(state.unit) && undfd(state.ten) ) {
      state.tens = math.tens.by_unit[state.unit];
      state.units = [state.unit];
    } else if ( defd(state.ten) && undfd(state.unit) ) {
      state.tens = [state.ten];
      state.units = math.units.by_ten[state.ten];
    } else if ( undfd(state.unit) && undfd(state.ten) ) {
      state.tens = math.tens.all;
      state.units = math.units.all;
    } else {
      state.tens = [state.ten];
      state.units = [state.unit];
    }
    return state;
  }

  function resetFactor(e) {
    const props = factors[e.target.closest('.factor-unit').id] || {};
    Object.assign(props,{unit:null});
    FactorUnit(props)
  }

  function redrawFactor(e) {
    e.preventDefault();
    const props = factors[e.target.closest('.factor-unit').id] || {};
    const {target} = e;
    props.unit = target.value
    FactorUnit(props);
  }

  function reset(e) {
    const props = cells[e.target.closest('.cell').id] || {};
    Object.assign(props,{ten:null,unit:null});
    Cell(props)
  }

  function redraw(e) {
    e.preventDefault();
    const props = cells[e.target.closest('.cell').id] || {};
    const {target} = e;
    const {name} = target;
    const parent = {};
    parent.ten = target.parentElement.querySelector('[name="ten"]');
    parent.unit = target.parentElement.querySelector('[name="unit"]');
    props[name] = target.value
    if ( name == 'ten' ) {
      const unit = Array.from(parent.unit.children).find( o => o.selected );
      props.unit = unit ? unit.value : null;
    } else if ( name == 'unit' ) {
      const ten = Array.from(parent.ten.children).find( o => o.selected );
      props.ten = ten ? ten.value : null;
    }
    Cell(props);
  }

  const ui = {
    Table
  }

  export default ui;
