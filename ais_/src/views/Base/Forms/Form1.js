import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Table,
} from 'reactstrap';
import InputMask from 'react-input-mask';

let perfn = [
  ['person_id', 'n', 3],
  ['household_no', 'n', 3],
  ['person_no', 'n', 3],
  ['temp_absent_district', 't', 30],
  ['absense_length', 'n', 1],
  ['absense_reason', 'n', 1],
  ['emp_resident_permanent_district', 't', 30],
  ['temp_resident_absense_length', 'n', 1],
  ['temp_resident_absense_reason', 'n', 1],
  ['exists_longterm_household_member_absent', 'n', 1],
  ['is_visitor', 't', 30],
]

class Form1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form1data: {
        dept_no: null,
        instructor_sector_no: null,
        counting_sector_no: null,
        resident_list_no: null,
        permanent_resident_household_count: null,
        total_resident_person_count: null,
        permanent_resident_person_count: null,
        temporary_nonresident_person_count: null,
        temporary_resident_person_count: null,
        longterm_nonresident_person_count: null,
        visitor_person_count: null,
        enigrssrs_eni_code: null,
        nsc_eni_code: null,
        region: null,
        district: null,
        town: null,
        city_district: null,
        township: null,
        microdistrict: null,
        settlment: null,
        village: null,
        street: null,
        house: null,
        flat: null,
        surname: null,
        organization: null,
      },
      persons: [
        [1, null, null, null, null, null, null, null, null, null, null]
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePerson = this.handleChangePerson.bind(this);
  }

  componentDidMount() {
    // let persarray = []
    // persarray.push([1, null, null, null, null, null, null, null, null, null, null])
    // this.props.persons.push([1, null, null, null, null, null, null, null, null, null, null])
    // this.setState({ persons: persarray })
    // console.log(this.state.persons)
  }

  defValue(str) {
    for (let ind = 0; ind < str.length; ind++) {
      str = str.replace('_', '')
    }
    for (let ind = 0; ind < str.length; ind++) {
      str = str.replace('-', '')
    }
    return str
  }

  async handleChange(e) {
    const name = e.target.name;
    let fdata = this.state.form1data
    let newval = this.defValue(e.target.value);
    console.log('val', newval)
    fdata[name] = newval
    this.setState({ form1data: fdata })
    this.props.form1data[name] = newval;

    if (name === "srs_eni_code" && parseInt(newval) !== null) {
      document.getElementById("nsc_soate_val").innerHTML = "";
      let fcode;
      const srs_code = newval;
      const length = srs_code.length;
      if (length >= 10) {
        fcode = srs_code.padEnd(14, '0')
        await fetch(`http://localhost:8000/srs/code/${fcode}`)
          .then(response => response.json())
          .then(data => {
            console.log(data.data)
            if (data.data.length > 0) {
              document.getElementById("nsc_soate_val").innerHTML = data.data[0].parent //+ ', ' + data.data[0].name
              fdata.region = data.data[0].region !== null ? data.data[0].region : '';
              this.props.form1data.region = fdata.region;
              fdata.district = data.data[0].district !== null ? data.data[0].district : '';
              this.props.form1data.district = fdata.district;
              fdata.settlment = data.data[0].settlment !== null ? data.data[0].settlment : '';
              this.props.form1data.settlment = fdata.settlment;
              fdata.town = data.data[0].city !== null ? data.data[0].city : '';
              this.props.form1data.town = fdata.town;
              fdata.street = data.data[0].street !== null ? data.data[0].street : '';
              this.props.form1data.street = fdata.street;
              fdata.house = data.data[0].house_no !== null ? data.data[0].house_no : '';
              this.props.form1data.house = fdata.house;
              fdata.flat = data.data[0].flat_no !== null ? data.data[0].flat_no : '';
              this.props.form1data.flat = fdata.flat;
              this.setState({ form1data: fdata })
            } else {
              let fdata = this.state.form1data;
              fdata.region = '';
              fdata.district = '';
              fdata.settlment = '';
              fdata.village = '';
              fdata.town = '';
              fdata.city = false;
              fdata.street = '';
              fdata.house = '';
              fdata.flat = '';
              this.setState({ form1data: fdata });
              this.props.form1data.region = '';
              this.props.form1data.district = '';
              this.props.form1data.village = '';
              this.props.form1data.settlment = '';
              this.props.form1data.town = '';
              this.props.form1data.street = '';
              this.props.form1data.house = '';
              this.props.form1data.flat = '';
            }
          })
          .catch(error => console.error(error))
      } else {
        let fdata = this.state.form1data;
        fdata.region = '';
        fdata.district = '';
        fdata.settlment = '';
        fdata.village = '';
        fdata.town = '';
        fdata.city = false;
        fdata.street = '';
        fdata.house = '';
        fdata.flat = '';
        this.setState({ form1data: fdata });
        this.props.form1data.region = '';
        this.props.form1data.district = '';
        this.props.form1data.village = '';
        this.props.form1data.settlment = '';
        this.props.form1data.town = '';
        this.props.form1data.street = '';
        this.props.form1data.house = '';
        this.props.form1data.flat = '';
      }
      // console.log(this.props.form1data.region)

      // this.setState({ formdata: f1data })
    }


    // console.log(this.props)
    console.log(this.props)

  }

  handleChangePerson(e) {
    console.log(this.state.persons)
    console.log(this.props)
    const name = e.target.name;
    let rind = parseInt(name.substring(2, name.indexOf('-')))
    let cind = parseInt(name.substring(name.indexOf('-') + 1))
    if (name.substring(0, name.length - 2) === `t_${rind}` && this.state.persons.length === rind + 1) {
      let persarray = this.state.persons;
      persarray.push([rind + 2, null, null, null, null, null, null, null, null, null, null]);
      this.props.persons.push([rind + 2, null, null, null, null, null, null, null, null, null, null]);
      console.log(this.props);
      this.setState({ persons: persarray });
    }
    let fdata = this.state.persons;
    fdata[rind][cind] = e.target.value;
    this.setState({ persons: fdata });
    this.props.persons[rind][cind] = e.target.value;
    console.log('vv', this.state.persons[rind][9]);
    if (this.state.persons[rind][9] === '2' && this.props.forms.form2.length + this.props.forms.form4.length + this.props.forms.form5.length <= rind + 1) {
      this.props.forms.form2.push({
        formname: `form2_${rind + 1}`,
        formdata: {}
      });
    }
    if (this.state.persons[rind][9] === '1' && this.props.forms.form2.length + this.props.forms.form4.length + this.props.forms.form5.length <= rind + 1) {
      this.props.forms.form4.push({
        formname: `form4_${rind + 2}`,
        formdata: {}
      });
    }
    if (this.state.persons[rind][10] !== null && this.props.forms.form2.length + this.props.forms.form4.length + this.props.forms.form5.length <= rind + 1) {
      this.props.forms.form5.push({
        formname: `form4_${rind + 2}`,
        formdata: {}
      });
    }
    console.log(this.state)
    console.log('props', this.props)

  }


  render() {
    return (
      <Row>
        <Col sm="12">
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label style={{ fontWeight: 'bold' }}>Переписной лист - Список проживающих</Label>
              </FormGroup>
            </Col>
          </Row>
          <Table size="sm" bordered responsive>
            <thead>
              <tr>
                <th rowSpan="2">№ переписного отдела</th>
                <th rowSpan="2">№ инструктор ского участка</th>
                <th rowSpan="2">№ счетного участка</th>
                <th rowSpan="2">№ списка проживающих</th>
                <th rowSpan="2">Число постоянно проживающих домохозяйств</th>
                <th rowSpan="2">Число лиц, записанных в список</th>
                <th colSpan='4'>в том числе:</th>
                <th rowSpan="2">Посетитель учреждения коллективного проживания (из гр.12)</th>
              </tr>
              <tr>
                <th>обычно проживающих (из гр. 4)</th>
                <th>временно отсутствующих (из гр. 5,6,7)</th>
                <th>временно проживающих (из гр. 8,9,10)</th>
                <th>длительно отсутствующих (из гр. 11)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Input onChange={this.handleChange} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="dept_no" id="dept_no" value={this.props.form1data["dept_no"] !== null ? this.props.form1data["dept_no"] : ''} /></td>
                <td><Input onChange={this.handleChange} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="instructor_sector_no" id="instructor_sector_no" value={this.props.form1data["instructor_sector_no"] !== null ? this.props.form1data["instructor_sector_no"] : ''} /></td>
                <td><Input onChange={this.handleChange} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="counting_sector_no" id="counting_sector_no" value={this.props.form1data["counting_sector_no"] !== null ? this.props.form1data["counting_sector_no"] : ''} /></td>
                <td><Input onChange={this.handleChange} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="resident_list_no" id="resident_list_no" /></td>
                <td><Input onChange={this.handleChange} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="permanent_resident_household_count" id="permanent_resident_household_count" /></td>
                <td><Input onChange={this.handleChange} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="total_resident_person_count" id="total_resident_person_count" /></td>
                <td><Input onChange={this.handleChange} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="permanent_resident_person_count" id="permanent_resident_person_count" /></td>
                <td><Input onChange={this.handleChange} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="temporary_nonresident_person_count" id="temporary_nonresident_person_count" /></td>
                <td><Input onChange={this.handleChange} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="temporary_resident_person_count" id="temporary_resident_person_count" /></td>
                <td><Input onChange={this.handleChange} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="longterm_nonresident_person_count" id="longterm_nonresident_person_count" /></td>
                <td><Input onChange={this.handleChange} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="visitor_person_count" id="visitor_person_count" /></td>
              </tr>
            </tbody>
          </Table>
          <Table size="sm" bordered responsive>
            <tbody>
              <tr>
                <th style={{ width: "20%" }}>
                  Код ЕНИ – ГРС при ПКР
                  </th>
                <td style={{ width: "20%" }}>
                  <Input onChange={this.handleChange} bsSize="sm" type="text" mask="999999999999999999" maskChar="" tag={InputMask} name="srs_eni_code" />
                </td>
                <td id="res_1" style={{ width: "60%" }}>
                </td>
              </tr>
              <tr>
                <th style={{ width: "20%" }}>
                  Код ЕНИ – НСК КР
                  </th>
                <td style={{ width: "20%" }}>
                  <Input onChange={this.handleChange} bsSize="sm" type="text" mask="9999-99999" maskChar="" tag={InputMask} name="nsc_eni_code" />
                </td>
                <td id="res_1" style={{ width: "60%" }}>
                </td>
              </tr>
            </tbody>
          </Table>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label style={{ fontWeight: 'bold' }}>Адрес помещения</Label>
              </FormGroup>
            </Col>
          </Row>
          <Table size="sm" bordered responsive>
            <tbody>
              <tr>
                <th style={{ width: "50%" }}>
                  Область
                        <Input onChange={this.handleChange} bsSize="sm" type="text" name="region" value={this.props.form1data["region"] !== null ? this.props.form1data["region"] : ''} disabled/>
                </th>
                <th style={{ width: "50%" }}>
                  Район
                        <Input onChange={this.handleChange} bsSize="sm" type="text" name="district" value={this.props.form1data["district"] !== null ? this.props.form1data["district"] : ''} disabled/>
                </th>
              </tr>
            </tbody>
          </Table>
          <Table size="sm" bordered responsive>
            <tbody>
              <tr>
                <th style={{ width: "40%" }}>
                  Город
                        <Input onChange={this.handleChange} bsSize="sm" type="text" name="town" value={this.props.form1data["town"] !== null ? this.props.form1data["town"] : ''} disabled/>
                </th>
                <th style={{ width: "30%" }}>
                  Внутригородской район
                        <Input onChange={this.handleChange} bsSize="sm" type="text" name="city_district" value={this.props.form1data["city_district"] !== null ? this.props.form1data["city_district"] : ''} disabled/>
                </th>
                <th style={{ width: "30%" }}>
                  Поселок городского типа
                        <Input onChange={this.handleChange} bsSize="sm" type="text" name="township" value={this.props.form1data["township"] !== null ? this.props.form1data["township"] : ''} disabled/>
                </th>
              </tr>
            </tbody>
          </Table>
          <Table size="sm" bordered responsive>
            <tbody>
              <tr>
                <th style={{ width: "50%" }}>
                  Наименование или номер городского микрорайона, жилмассива, новостройки
                        <Input onChange={this.handleChange} bsSize="sm" type="text" name="microdistrict" value={this.props.form1data["microdistrict"] !== null ? this.props.form1data["microdistrict"] : ''} disabled/>
                </th>
                <th style={{ width: "50%" }}>
                  Айылный аймак
                        <Input onChange={this.handleChange} bsSize="sm" type="text" name="settlment" value={this.props.form1data["settlment"] !== null ? this.props.form1data["settlment"] : ''} disabled/>
                </th>
              </tr>
            </tbody>
          </Table>
          <Table size="sm" bordered responsive>
            <tbody>
              <tr>
                <th style={{ width: "40%" }}>
                  Село (айыл)
                        <Input onChange={this.handleChange} bsSize="sm" type="text" name="village" value={this.props.form1data["village"] !== null ? this.props.form1data["village"] : ''} disabled/>
                </th>
                <th style={{ width: "40%" }}>
                  Проспект, улица, переулок
                        <Input onChange={this.handleChange} bsSize="sm" type="text" name="street" value={this.props.form1data["street"] !== null ? this.props.form1data["street"] : ''} disabled/>
                </th>
                <th style={{ width: "10%" }}>
                  № дома
                        <Input onChange={this.handleChange} bsSize="sm" type="text" name="house" value={this.props.form1data["house"] !== null ? this.props.form1data["house"] : ''} disabled/>
                </th>
                <th style={{ width: "10%" }}>
                  № квартиры
                        <Input onChange={this.handleChange} bsSize="sm" type="text" name="flat" value={this.props.form1data["flat"] !== null ? this.props.form1data["flat"] : ''} disabled/>
                </th>
              </tr>
            </tbody>
          </Table>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label style={{ fontWeight: 'bold' }}>Список проживающих (число жильцов) в помещении</Label>
              </FormGroup>
            </Col>
          </Row>
          <Table size="sm" bordered responsive>
            <thead>
              <tr>
                <th rowSpan="2">№ п.п. лица в пределах помещения</th>
                <th rowSpan="2">№ п.п. домохозяйства в пределах помещения</th>
                <th rowSpan="2">№ п.п. лица в пределах домо хозяйства</th>
                <th colSpan='3'>Для постоянно (обычно) здесь проживающего, но временно отсутствующего, записать:</th>
                <th colSpan='3'>Для временно пребывающего (проживающего) записать:</th>
                <th rowSpan="2">Есть ли члены домохозяйства, длительно (1 год и более) проживающие за границей Кыргызстана? (заполняется только бланк по ф.4) 1- да 2- нет </th>
                <th rowSpan="2">Посетитель в учреждении коллективного проживания (заполняется   бланк по ф.5)</th>
              </tr>
              <tr>
                <th>а)адрес места временного проживания (название района, города Кыргызстана/ другой страны)</th>
                <th>б)продолжи тельность отсутствия: 1- менее 1-го месяца; 2- до 1-го года</th>
                <th>в)причина отсутствия: 1-работа; 2- учеба; 3-семейные обстоятельства; 4-иное</th>
                <th>а)место обычного проживания (название района, города Кыргызстана/другой страны)</th>
                <th>б)продолжи тельность отсутствия в месте постоянного жительства: 1-менее 1-го месяца; 2-до 1-го года</th>
                <th>в)причина пребывания: 1-работа; 2-учеба; 3-семейные обстоятель ства; 4-иное</th>
              </tr>
              <tr>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
              </tr>
            </thead>
            <tbody>
              {this.state.persons.map((person, index) =>
                <tr key={index}>
                  {person.map((prow, rindex) =>
                    (perfn[rindex][1] === 'n') ?
                      <td key={`i_${index}-${rindex}`}><Input onChange={this.handleChangePerson} value={prow !== null ? prow : ''} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name={`t_${index}-${rindex}`} id={`t_${index}-${rindex}`} /></td> :
                      <td key={`i_${index}-${rindex}`}><Input onChange={this.handleChangePerson} bsSize="sm" type="text" name={`t_${index}-${rindex}`} id={`t_${index}-${rindex}`} /></td>
                  )}
                </tr>)}
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

export default Form1;
