import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      logged: false
    };

    this.onLoginChange = this.onLoginChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    // const { history } = this.props;   
    event.preventDefault();
    fetch(`http://localhost:8000/users/username/${this.state.username}`)
      .then(response => response.json())
      .then(data => {
        if (data.data.length === 1) {
          if (this.state.username === data.data[0].username && this.state.password === data.data[0].pwd ) {
            localStorage.setItem('uname', this.state.username);
            this.setState({logged:true})
            // history.push("/base/forms");
          }
        }
        console.log(data) // Prints result from `response.json()` in getRequest
      })
      .catch(error => console.error(error))
    

    // alert(`${this.state.username}, добро пожаловать!`);
    
  }

  onPasswordChange(event){
    this.setState({password: event.target.value});
  }

  onLoginChange(event) {
    this.setState({username: event.target.value});
  }

  render() {
    if (this.state.logged) {
      return <Redirect from="/login" to="/" />
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
              <Card className="text-white bg-primary p-4 d-md-down-none" style={{ width: '100%' }}>
                  <CardBody className="text-center">
                    <div>
                      <img src={'../../assets/img/logo.png'} className="img-avatar" alt="stat.kg" height="100" width="100" />
                      {/* <img src="../../assets/img/brand/logo.png" alt="Smiley face" height="42" width="42" />  */}
                      <h3>Национальный статистический комитет Кыргызской Республики</h3>
                      <p>Система ввода данных "Перепись 2020".</p>
                    </div>
                  </CardBody>
                </Card>
                <Card className="p-4">
                  <CardBody>
                    <Form  onSubmit={this.onSubmit}>
                      <h1>Вход в систему</h1>
                      <p className="text-muted">Введите ваши учетные данные</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="text" 
                          name="username" 
                          placeholder="Пользователь" 
                          autoComplete="username" 
                          value={this.state.username} 
                          onChange={this.onLoginChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="password" 
                          name="password" 
                          placeholder="Пароль" 
                          autoComplete="password" 
                          value={this.state.password}
                          onChange={this.onPasswordChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Войти</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
