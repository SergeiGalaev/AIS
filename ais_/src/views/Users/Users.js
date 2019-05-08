import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, 
          Form, FormGroup, Label, Input} from 'reactstrap';


function Dateformat(ds) {
  const dat = new Date(ds)
  return dat.toLocaleDateString("ru-Ru")
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersdata:[],
      userroles:[],
      large: false,
      operation:'',
      id:'',
      uname:'',
      fname:'',
      unumber:'',
      urole:3,
      upwd:'',
    };
    this.onChange = this.onChange.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.toggleSubmit = this.toggleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleNew = this.toggleNew.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
  }

  async FetchData() {
    await fetch(`http://localhost:8000/users`)
        .then(response => response.json())
        .then(data => {
          this.setState({usersdata: data.data});
          console.log(data.data) 
        })
        .catch(error => console.error(error))
  } 

  componentDidMount(){
    this.FetchData();
  }

  toggleInput() {
    this.setState({
      large: !this.state.large,
    });
  }

  toggleNew() {
    this.setState({
      large: !this.state.large,
      operation: 'new',
      uname:'',
      fname:'',
      unumber:'',
      urole:3,
      upwd:'',
    });
  }

  onChange(event){
    console.log(event)
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  async toggleSubmit() {
    const user = {
      username: this.state.uname,
      fullname: this.state.fname,
      pwd: this.state.upwd,
      user_number: this.state.unumber,
      user_role: this.state.urole,
      create_by:1
    }
    console.log(user)
    if (this.state.operation === 'new') {
      await fetch(`http://localhost:8000/users`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data) 
      })
      .catch(error => console.error(error))
    }
    if (this.state.operation === 'edit') {
      const id = this.state.id
      await fetch(`http://localhost:8000/users`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({id:id, data:user})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data) 
      })
      .catch(error => console.error(error))
    }
    this.toggleInput();
    this.FetchData();
  }

  async toggleEdit(event) {
    const id = event.target.id
    this.toggleInput();
    await fetch(`http://localhost:8000/users/id/${event.target.id}`)
      .then(response => response.json())
      .then(data => {
        // this.setState({usersdata: data.data});
        console.log(data.data) 
        const editdata = data.data[0]
        this.setState({
          id: id,
          operation: 'edit',
          uname: editdata.username,
          fname: editdata.fullname,
          unumber: editdata.user_number !== null ? editdata.user_number : '',
          urole: editdata.user_role,
          upwd: editdata.pwd,
        });
      })
      .catch(error => console.error(error))
    // this.toggleInput();
    this.FetchData();
  }

  async toggleDelete(event) {
    const id = event.target.id
    const res = window.confirm("Удалить запись...")
    console.log(id, res)
    if (res) {
      await fetch(`http://localhost:8000/users`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify({id:id})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data) 
      })
      .catch(error => console.error(error))

    }
    this.FetchData();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-users"></i> Пользователи
                <Button onClick={this.toggleNew} color="primary" className="fa fa-user-plus btn-square mr-1 float-right" size="sm" > Создать</Button>
                <Modal isOpen={this.state.large} toggle={this.toggleInput}
                       className={'modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleInput}>Пользователь</ModalHeader>
                  <ModalBody>
                    <Form className="form-horizontal" action="submit" method="post">
                      <FormGroup className="pr-1" row>
                        <Col md="3">
                          <Label>Пользователь</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input 
                            type="text" 
                            name="uname" 
                            value={this.state.uname} 
                            onChange={this.onChange}
                            required />
                        </Col>  
                      </FormGroup>
                      <FormGroup className="pr-1" row>
                        <Col md="3">
                          <Label>Фамилия И.О.</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input 
                            type="text" 
                            name="fname" 
                            value={this.state.fname} 
                            onChange={this.onChange}
                            required />
                        </Col>  
                      </FormGroup>
                      <FormGroup className="pr-1" row>
                        <Col md="3">
                          <Label>Табельный номер</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input 
                            type="text" 
                            name="unumber" 
                            value={this.state.unumber} 
                            onChange={this.onChange}
                            required />
                        </Col>  
                      </FormGroup>
                      <FormGroup className="pr-1" row>
                        <Col md="3">
                          <Label>Права доступа</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input 
                            type="select" 
                            name="urole" 
                            value={this.state.urole} 
                            onChange={this.onChange}
                            required>
                            <option value="1">Администратор</option>
                            <option value="2">Пользователь</option>
                            <option value="3">Оператор</option>
                          </Input>
                        </Col>  
                      </FormGroup>
                      <FormGroup className="pr-1" row>
                        <Col md="3">
                          <Label>Пароль</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input 
                            type="password" 
                            name="upwd" 
                            value={this.state.upwd} 
                            onChange={this.onChange}
                            required />
                        </Col>  
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button className="btn-square" color="primary" size="sm"  onClick={this.toggleSubmit}>Сохранить</Button>{' '}
                    <Button className="btn-square" color="secondary" size="sm" onClick={this.toggleInput}>Отменить</Button>
                  </ModalFooter>
                </Modal>
              </CardHeader>
              <CardBody>
                <Table className="table-outline mb-0 d-none d-sm-table" responsive hover bordered>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Пользователь</th>
                      <th scope="col">Фамилия И.О.</th>
                      <th scope="col">Табельный номер</th>
                      <th scope="col">Создан</th>
                      <th scope="col">Права доступа</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.usersdata.map((user, index) =>
                      <tr key={user.id.toString()}>
                        <td>
                          <Button name="Edit" id={user.id.toString()} className="fa fa-pencil btn-square" size="sm" color="primary" onClick={this.toggleEdit} ></Button>{' '}
                          <Button name="Del" id={user.id.toString()} className="fa fa-minus btn-square" size="sm" color="danger" onClick={this.toggleDelete}></Button>    
                        </td>
                        <td>{user.username}</td>
                        <td>{user.fullname}</td>
                        <td>{user.user_number}</td>
                        <td>{Dateformat(user.created)}</td>
                        <td>{user.user_role === 1 ? 'Администратор' : 
                              user.user_role === 2 ? 'Пользователь' : 
                                user.user_role === 3 ? 'Оператор' : '' }</td>
                    </tr>
                      // <UserRow key={index} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
