import React, { useState } from 'react'
import { Modal, Container, Segment, Step, Icon, Button, Form, Input, Header, Checkbox, Grid, Divider, Loader, Dimmer} from 'semantic-ui-react'
import wallofText from '../assets/wallofText.json'
import gql from 'graphql-tag';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

function RentalModal(props) {
  
  const [ phase, setPhase ] = useState(1);
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ understand1, setUnderstand1 ] = useState(false);
  const [ understand2, setUnderstand2 ] = useState(false);
  const [ itemRented, setItemRented ] = useState(false);

  const [getPoints, { called, loading, data }] = useLazyQuery(GET_USER)

  const [rentItem, { rentData, error }] = useMutation(RENT_ITEM, {
    onCompleted(){
      setItemRented(true);
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      item: props.itemData.item,
      username: username,
      numberOfItems: parseInt(props.numberOfItems),
      email: email,
      phone: phone
    }
  })

  function doneRenting() {
    setPhase(1);
    setUsername('');
    setEmail('');
    setPhone('');
    setItemRented(false);
    setUnderstand1(false);
    setUnderstand2(false);
    props.doneRenting();
  }

  const lookUpUser = () => getPoints({ variables: { username:username } })

  return (
    <Modal open={props.renting}>
      <Container>
        <Segment>
          <Step.Group fluid>
            <Step active={phase === 1} completed={phase >= 2}>
              <Icon name='file alternate'/>
              <Step.Content>
                <Step.Title>Rental Agreement</Step.Title>
              </Step.Content>
            </Step>

            <Step active={phase === 2} completed={phase >= 3}>
              <Icon name='user'/>
              <Step.Content>
                <Step.Title>Account Validation</Step.Title>
              </Step.Content>
            </Step>

            <Step active={phase === 3} completed={phase >= 4}>
              <Icon name='info'/>
              <Step.Content>
                <Step.Title>Information</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
          {phase === 1 ? //FIRST SEGMENT
          <Segment>
            <Segment>
              {wallofText.wallofText}
            </Segment>
            <Grid columns={2}>
              <Grid.Column textAlign='center'>
                <Button
                  onClick={doneRenting}
                >
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Button
                  onClick={() => setPhase(2)}
                >
                  I Agree
                </Button>
              </Grid.Column>
            </Grid>
          </Segment> : phase === 2 ? //SECOND SEGMENT
          <Segment padded>
            <Header>{"Enter your SHPE username to verify your points"}</Header>
            <Form>
              <Grid columns={2} rows={4}>
                <Grid.Row>
                  <Input
                    onChange={(e) => {setUsername(e.target.value)}}
                  />
                  <Button
                    onClick={lookUpUser}
                  >
                    Find
                  </Button>
                  {loading | !data ? <Icon loading />:
                    <Icon name={data.getUser ? 'check' : 'times'} color={data.getUser ? 'green' : 'red'}/>
                  }
                </Grid.Row>
                <Grid.Row>
                  <Checkbox
                    label='I understand that this is my SHPE account'
                    onChange={(e,data) => setUnderstand1(data.checked)}
                  />
                </Grid.Row>
                <Grid.Row>
                  <Checkbox
                    label='I understand that I will have to present my UFID when renting'
                    onChange={(e,data) => setUnderstand2(data.checked)}
                  />
                </Grid.Row>
                <Grid.Row textAlign='center'>
                  <Grid.Column>
                    <Button
                    onClick={doneRenting}
                    >
                      Cancel
                    </Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Button
                      onClick={() => setPhase(3)}
                      disabled={!(understand1 && understand2 && data && data.getUser)}
                    >
                      Continue
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Segment> : phase === 3 ? //THIRD SEGMENT
          <Segment padded>
            <Form>
              <Grid columns={1} textAlign='center'>
                <Grid.Row>
                  <Header>{'Information so we can reach you!'}</Header>
                </Grid.Row>
                <Grid.Row>
                  <Form.Field>
                    <label>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)}/>
                  </Form.Field>
                </Grid.Row>
                <Grid.Row>
                  <Form.Field>
                    <label>Phone Number</label>
                    <input onChange={(e) => setPhone(e.target.value)}/>
                  </Form.Field>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row textAlign='center'>
                  <Grid.Column>
                    <Button
                      onClick={doneRenting}
                    >
                      Cancel
                    </Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Button
                      onClick={() => {
                        rentItem();
                        setPhase(4);
                      }}
                    >
                      Rent
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Segment> : //FOURTH SEGMENT
          <Segment>
            {!itemRented ? <Segment size='massive'><Dimmer active><Loader active/></Dimmer></Segment> :
            <Grid columns={1} textAlign='center'>
              <Grid.Row>
                <Header>
                  Complete!
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Icon name='check' color='green' size='massive'/>
              </Grid.Row>
              <Grid.Row>
                <Button
                  onClick={doneRenting}
                >
                  Done
                </Button>
              </Grid.Row>
            </Grid>
            }
          </Segment>}
        </Segment>
      </Container>
    </Modal>
  )
}

const GET_USER = gql`
  query getUser(
    $username: String!
  ){
    getUser(
      username: $username
    ){
      points
    }
  }
`;

const RENT_ITEM = gql`
  mutation checkOut(
    $item: String!
    $username: String!
    $numberOfItems: Int!
    $email: String!
    $phone: String
  ){
    checkOut(
      data: {
        item: $item
        username: $username
        numberOfItems: $numberOfItems
        email: $email
        phone: $phone
      }
    ) {
      username
      item
      dateOpened
    }
  }
`;

export default RentalModal;