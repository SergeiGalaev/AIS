import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Table,
  // Form,
  // Button,
} from 'reactstrap';
import InputMask from 'react-input-mask';
import variants from './Variants';

class InputRow extends React.Component {

  render() {
    return (
      <tr>
        <th style={{ width: "55%" }}>
          {this.props.label}
        </th>
        <td style={{ width: "15%" }}>
          <Input onChange={this.props.onChange} bsSize="sm" type="text" mask={this.props.mask} maskChar={this.props.mchar} tag={InputMask} name={this.props.name} value={this.props.value || ''}/>
        </td>
        <td id={`sval_${this.props.name}`} style={{ width: "30%" }}>
        </td>
      </tr>
    )
  }
}

class Form3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form3data: {
        type_residential_building: null,
        number_storeys: null,
        period_construction_no: null,
        exterior_material: null,
        seismic_resistance: null,
        type_living_room: null,
        living_occupation: null,
        room_area: null,
        living_area: null,
        other_area: null,
        number_flat: null,
        sources_electricity: null,
        sources_gas: null,
        heating_type: null,
        water_system: null,
        sewer_system: null,
        toilet: null,
        hot_water: null,
        bath: null,
        sauna: null,
        kitchen: null,
        kitchen_equipment: null,
        waste_disposal: null,
        computer: null,
        computer_count: null,
        phone: null,
        tv: null,
        internet: null,
        household_no_1: null,
        household_no_2: null,
        household_no_3: null,
        household_no_4: null,
        ownership_1: null,
        ownership_2: null,
        ownership_3: null,
        ownership_4: null,
        area_1: null,
        living_area_1: null,
        area_2: null,
        living_area_2: null,
        area_3: null,
        living_area_3: null,
        area_4: null,
        living_area_4: null,
        flat_count_1: null,
        flat_count_2: null,
        flat_count_3: null,
        flat_count_4: null,
      },
    };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    console.log(this.state)
    console.log(event)
    const name = event.target.name;
    let keyval = event.target.value;
    // const form = event.target.form;
    // const index = Array.prototype.indexOf.call(form, event.target);
    // if (keyval.substr(keyval.length - 1, 1) === '.') keyval = keyval.substring(0, keyval.length - 1)
    let fdata = this.state.form3data
    fdata[name] = keyval
    if (variants.f3variants[name]) {
      let find = false
      const lastval = variants.f3variants[name][variants.f3variants[name].length - 1][0]
      const maxval = typeof lastval === 'number' ? lastval : 99999
      if (parseInt(keyval) > maxval || keyval === '0') {
        let newval = keyval.substring(0, keyval.length - 1)
        fdata[name] = newval
        keyval = this.state.form3data[name]
      }
      
      for (let ind = 0; ind < variants.f3variants[name].length; ind++) {
        let curr_value = variants.f3variants[name][ind][0]
        curr_value = parseFloat(curr_value)
        const keyvals = parseFloat(keyval)
        if (curr_value === keyvals) {
          find = true
          document.getElementById(`sval_${name}`).innerHTML = variants.f3variants[name][ind][1]
          break;
        } else {
          document.getElementById(`sval_${name}`).innerHTML = ''
        }
      }
      if (!find) {
        fdata[name] = ''
        document.getElementById(`sval_${name}`).innerHTML = ''
        keyval = this.state.form3data[name]
      }
    }
  //   this.setState({ value: event.target.value });
  //   const name = event.target.name;
  //   let keyval = event.target.value;
  //   if (variants.f3variants[name]) {
  //     for (let ind = 0; ind < variants.f3variants[name].length; ind++) {
  //       if (parseInt(variants.f3variants[name][ind][0]) === parseInt(keyval)) {
  //         document.getElementById(`sval_${name}`).innerHTML = variants.f3variants[name][ind][1]
  //         break;
  //       } else {
  //         document.getElementById(`sval_${name}`).innerHTML = '' 
  //       }
  //     }
    // } 
      // console.log(ind)
    this.props.data[name] = keyval
    this.setState({ form3data: fdata })
    event.preventDefault()
    console.log(this.state)
    
  }


  render() {

    return (
      <Row>
        <Col sm="12">
          {/* <Form id="f2"> */}

          <FormGroup>
            <Label style={{ fontWeight: 'bold' }}>ПЕРЕПИСНОЙ ЛИСТ - ЖИЛИЩНЫЙФОНД</Label>
          </FormGroup>
          <Row>
            <Col md={6}>
              <Table size="sm" bordered>
                <tbody>
                  <tr style={{ background: "#6ef1a2" }}><th colSpan='3'> РАЗДЕЛ I – ЗАПОЛНЯЕТСЯ НА ЖИЛОЕ СТРОЕНИЕ (вопросы 1-5)</th></tr>
                  <InputRow onChange={(e) => this.handleChange(e)} label="1. Тип жилого строения" mask="9" mchar="" name="type_residential_building" value={this.state.form3data.type_residential_building}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="2. Этажность" mask="9" mchar="" name="number_storeys" value={this.state.form3data.number_storeys}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="3. Период постройки жилого строения" mask="99" mchar="" name="period_construction_no" value={this.state.form3data.period_construction_no}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="4. Материал наружных стен дома" mask="9" mchar="" name="exterior_material" value={this.state.form3data.exterior_material}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="5. Сейсмостойкость" mask="9" mchar="" name="seismic_resistance" value={this.state.form3data.seismic_resistance}/>
                  <tr style={{ background: "#6ef1a2" }}><th colSpan='3'>РАЗДЕЛ II – ЗАПОЛНЯЕТСЯ НА ЖИЛОЕ ПОМЕЩЕНИЕ (вопросы 6-10)</th></tr>
                  <InputRow onChange={(e) => this.handleChange(e)} label="6. Тип занимаемого жилого помещения" mask="99" mchar="" name="type_living_room" value={this.state.form3data.type_living_room}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="7. Занятость жилого помещения" mask="9" mchar="" name="living_occupation" value={this.state.form3data.living_occupation}/>
                </tbody>
              </Table>
              <Table size="sm" bordered>
                <tbody>
                  <tr>
                    <th style={{ width: "20%" }}>
                      8. Размер площади жилого помещения
                          </th>
                    <th style={{ width: "10%" }}>
                      1- общая
                          </th>
                    <td style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="room_area" />
                    </td>
                    <th style={{ width: "10%" }}>
                      2 - жилая
                          </th>
                    <td style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="living_area" />
                    </td>
                    <th style={{ width: "10%" }}>
                      3 - в других целях
                          </th>
                    <td style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="other_area" />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table size="sm" bordered>
                <tbody>
                  <InputRow onChange={(e) => this.handleChange(e)} label="9. Число жилых комнат" mask="99" mchar="" name="number_flat" value={this.state.form3data.number_flat} />
                </tbody>
              </Table>
            </Col>
            <Col md={6}>
              <Table size="sm" bordered>
                <tbody>
                  <tr style={{ background: "#6ef1a2" }}><th colSpan='3'>10. ВИДЫ БЛАГОУСТРОЙСТВА ЖИЛОГО ПОМЕЩЕНИЯ, ИСПОЛЬЗУЕМОГО ДЛЯ ПРОЖИВАНИЯ</th></tr>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.1 Источники электроснабжения" mask="9" mchar="" name="sources_electricity" value={this.state.form3data.sources_electricity}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.2 Источники подачи газа" mask="9" mchar="" name="sources_gas" value={this.state.form3data.sources_gas}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.3 Тип отопления" mask="9" mchar="" name="heating_type" value={this.state.form3data.heating_type}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.4 Система водоснабжения" mask="9" mchar="" name="water_system" value={this.state.form3data.water_system}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.5 Канализационная система" mask="9" mchar="" name="sewer_system" value={this.state.form3data.sewer_system}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.6 Туалет" mask="9" mchar="" name="toilet" value={this.state.form3data.toilet}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.7 Горячее водоснабжение" mask="9" mchar="" name="hot_water" value={this.state.form3data.hot_water}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.8 Ванна и (или) душ" mask="9" mchar="" name="bath" value={this.state.form3data.bath}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.9 Баня и (или) сауна" mask="9" mchar="" name="sauna" value={this.state.form3data.sauna}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.10 Кухня" mask="9" mchar="" name="kitchen" value={this.state.form3data.kitchen}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.11 Оборудование для приготовления пищи" mask="9" mchar="" name="kitchen_equipment" value={this.state.form3data.kitchen_equipment}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.12 Система удаления отходов" mask="9" mchar="" name="waste_disposal" value={this.state.form3data.waste_disposal}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.13 Имеется ли в жилище компьютер/ноутбук/планшет" mask="9" mchar="" name="computer" value={this.state.form3data.computer}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="Количество компьютеров" mask="99" mchar="" name="computer_count" value={this.state.form3data.computer_count}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.14 Телефон" mask="9" mchar="" name="phone" value={this.state.form3data.phone}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.15 Имеется ли в жилище телевидение" mask="9" mchar="" name="tv" value={this.state.form3data.tv}/>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.16 Имеется ли в жилище интернет" mask="9" mchar="" name="internet" value={this.state.form3data.internet}/>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Table size="sm" bordered>
                <tbody>
                  <tr style={{ background: "#6ef1a2" }}><th colSpan='9'>РАЗДЕЛ III – ЗАПОЛНЯЕТСЯ НА КАЖДОЕ ДОМОХОЗЯЙСТВО, ПОСТОЯННО ПРОЖИВАЮЩЕЕВ ЖИЛОМ ПОМЕЩЕНИИ (вопросы 11-13)</th></tr>
                  <tr>
                    <th style={{ width: "40%" }}>No п.п. домохозяйства (из графы 2 формы 1)</th>
                    <td colSpan='2' style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="household_no_1" />
                    </td>
                    <td colSpan='2' style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="household_no_2" />
                    </td>
                    <td colSpan='2' style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="household_no_3" />
                    </td>
                    <td colSpan='2' style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="household_no_4" />
                    </td>
                  </tr>
                  <tr>
                    <th style={{ width: "40%" }}>11. Форма собственности жилого помещения</th>
                    <td colSpan='2' style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="9" maskChar="" tag={InputMask} name="ownership_1" />
                    </td>
                    <td colSpan='2' style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="9" maskChar="" tag={InputMask} name="ownership_2" />
                    </td>
                    <td colSpan='2' style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="9" maskChar="" tag={InputMask} name="ownership_3" />
                    </td>
                    <td colSpan='2' style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="9" maskChar="" tag={InputMask} name="ownership_4" />
                    </td>
                  </tr>
                  <tr>
                    <th style={{ width: "40%" }}>12. Размер занимаемой домохозяйством площади в жилом</th>
                    <td style={{ width: "5%" }}> общая
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="area_1" />
                    </td>
                    <td style={{ width: "5%" }}> жилая
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="living_area_1" />
                    </td>
                    <td style={{ width: "5%" }}> общая
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="area_2" />
                    </td>
                    <td style={{ width: "5%" }}> жилая
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="living_area_2" />
                    </td>
                    <td style={{ width: "5%" }}> общая
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="area_3" />
                    </td>
                    <td style={{ width: "5%" }}> жилая
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="living_area_3" />
                    </td>
                    <td style={{ width: "5%" }}> общая
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="area_4" />
                    </td>
                    <td style={{ width: "5%" }}> жилая
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="living_area_4" />
                    </td>
                  </tr>
                  <tr>
                    <th style={{ width: "40%" }}>13. Число занимаемых домохозяйством жилых комнат</th>
                    <td colSpan='2' style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="flat_count_1" />
                    </td>
                    <td colSpan='2' style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="flat_count_2" />
                    </td>
                    <td colSpan='2' style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="flat_count_3" />
                    </td>
                    <td colSpan='2' style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="flat_count_4" />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Form3;
