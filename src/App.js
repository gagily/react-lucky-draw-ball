import React from 'react';
import './App.css';


class App extends React.Component {
  constructor() {
    super();

    this.state= {
      ticket: [],
      bet: '',
      betArray: [],
      tickets: [],
      numberTicket: 0,
      number: null, 
      random: [],
      randomArray: [],
      test: [],
      constraint: false,
      ticketsLength: [],
      gain: [],
      winingText: [],
      emptyTicket: false,
      noBets: false,
      startNew: false
    }

    this.makeTicket=this.makeTicket.bind(this);
    this.addTicket=this.addTicket.bind(this);
    this.drawing=this.drawing.bind(this);
    this.compare=this.compare.bind(this);
    this.buttonColoring=this.buttonColoring.bind(this);
    this.addBet=this.addBet.bind(this);
    this.winner=this.winner.bind(this);
    this.odds=this.odds.bind(this);
    this.backOnStart=this.backOnStart.bind(this);
  }

  makeTicket(e) {
    e.preventDefault();
    const validateTicket = this.state.numberTicket;
    const ticketInProgres = this.state.ticket;
    const number = e.target.value;
      if(validateTicket <5 && ticketInProgres.length < 5 && !ticketInProgres.includes(number)) {
        this.setState({
        number: number,
        ticket: [...this.state.ticket, number]
        })
      } 
    
  }

  addTicket(e) {
    e.preventDefault();
    const ticket =this.state.ticket;
    const numberOfTickets = this.state.numberTicket;
    if (numberOfTickets<5 && ticket.length>0 && this.state.bet>0) {
      this.setState({
            ...this.state,
            tickets: [...this.state.tickets, ticket ],
            betArray: [...this.state.betArray, this.state.bet],
            ticket: [],
            bet: '',
            numberTicket: this.state.numberTicket +1,
            ticketsLength: [...this.state.ticketsLength, ticket.length],
            emptyTicket: false,
            noBets: false
        })
    }else if(ticket.length===0) {
    	this.setState({
    		emptyTicket: true
    	})
    } else {
    	this.setState({
    		noBets: true,
    		emptyTicket: false
    	})
    }
  }

  addBet(e) {
    e.preventDefault();
    const newBet = e.target.value;
    if (/^\d+$/.test(newBet) && newBet<1001) {
      this.setState({
        constraint: false,
        bet: newBet
      })
    } else {
      this.setState({
        constraint: true
      })
    }
  }

  drawing() {
    this.interval = setInterval(() => {  
      if (this.state.randomArray.length < 12) {
        let newNumber= Math.floor(1 + Math.random() * (30 - 1));
        if(!this.state.randomArray.includes(newNumber))
        this.setState({randomArray: [...this.state.randomArray, newNumber]});        
      } else {
        clearInterval(this.interval);
        this.compare(this.state.randomArray, this.state.tickets);  
      }
    }, 1000);
  }

  odds(index) {
	  const odds1= 4;
	  const odds2= 8;
	  const odds3= 12;
	  const odds4= 16;
	  const odds5= 20;

	    if(this.state.ticketsLength[index]===1){
	      return odds1
	    }else if(this.state.ticketsLength[index]===2){
	      return odds2
	    }else if(this.state.ticketsLength[index]===3){
	      return odds3
	    }else if(this.state.ticketsLength[index]===2){
	      return odds4
	    }else {
	      return odds5
	    }
  }

  compare(random, arr) {
	let myArray = arr;
	let firstArr = random;

	for(let i = 0; i < myArray.length; i++){
	    let joinedArray= myArray[i].join(',');
	    let newArray = joinedArray.split(',').map(x => parseInt(x, 10))
	    let presek = firstArr.filter(x => newArray.includes(x));
	    if (presek.length === newArray.length){
	      this.setState({
	          test: [...this.state.test, true],
	        })
	    } else {
	      this.setState({
	          test: [...this.state.test, false],
	        })
	    }
	} 
	this.winner();
  }

  winner() {
    const testing= this.state.test;
    for(let i=0; i<5; i++){
      let gain= this.odds(i) * this.state.betArray[i];
      if(testing[i]===true){
        this.setState({
          gain: [...this.state.gain, gain]
        });
        let element= document.getElementById('ticket'+i);
        let elementT= document.getElementById('bet' +i);
        element.style.backgroundColor= '#1cb51c';
        elementT.style.backgroundColor= '#1cb51c';
      } else {
        this.setState({
          gain: [...this.state.gain, 0]
        });
        let elementL= document.getElementById('ticket'+i);
        let elementLT= document.getElementById('bet' +i);
        elementL.style.backgroundColor= 'red';
        elementLT.style.backgroundColor= 'red';
      }
    }
    for(let i=0; i<5; i++){
    	if(this.state.gain[i]>0){
          this.setState({
            winingText: [...this.state.winingText, 'Ticket ' + (i+1) + ' is winnig ticket! You won ' + this.state.gain[i] + '$']
          })
        }
    }

  	this.backOnStart();
  }

  backOnStart() {
  	this.setState({
  	startNew: true
  	});
  	setTimeout(()=> {
  		for (let i=1; i<31; i++) {
        let element=document.getElementById(i);
        element.style.backgroundColor='#27671b';
        element.style.borderColor= '#27671b';
    	};
  		this.setState({
	  	ticket: [],
	    bet: '',
	    betArray: [],
	    tickets: [],
	    numberTicket: 0,
	    number: null, 
	    random: [],
	    randomArray: [],
	    test: [],
	    constraint: false,
	    ticketsLength: [],
	    gain: [],
	    winingText: [],
	    emptyTicket: false,
	    noBets: false,
	    startNew: false
	  	})
  	}, 10000);	
  }

  buttonColoring(number) {
    if(number===1 || number ===9 || number===17 || number === 25) {
      return 'borderGreen'
    }else if(number===2 || number ===10 || number===18 || number === 26){
      return 'borderBlue'
    }else if(number===3 || number ===11 || number===19 || number === 27){
      return 'borderRed'
    }else if(number===4 || number ===12 || number===20 || number === 28){
      return 'borderViolet'
    }else if(number===5 || number ===13 || number===21 || number === 29){
      return 'borderYellow'
    }else if(number===6 || number ===14 || number===22 || number === 30){
      return 'borderOgrange'
    }else if(number===7 || number ===15 || number===23){
      return 'borderBrown'
    }else {
      return 'borderGray'
    }
  }

  render() {
    let id= this.state.number;
    let element = document.getElementById(id);
    if(id) {
      element.style.backgroundColor='#ff8c1a';
      element.style.borderColor= '#ff8c1a';
    }
    
    const numbers = [];

    for (let i=1; i<31; i++) {
      numbers.push(i);
    }

    const listItems=numbers.map((number, index) => 
       <button key={index} value={number} className="number green" id={number} onClick={this.makeTicket}>{number}</button>
        );
    
    const showBet = this.state.betArray.map((bet, index) => <div key={index} id={'bet'+(index)} className="height50">{'bet: ' + (bet) + '$   odds: ' + (this.odds(index))}</div>);
    const tickets=this.state.tickets;
    const listTickets= tickets.map((ticket, index) => <li key={index} id={'ticket'+(index)} className="height50">{
      ticket.map((number, index)=>
        <button key={index} value={number} className="numbersOnTicket">{number}</button>)}</li>
        );
   
    const randomArray =this.state.randomArray;
    const showArray=randomArray.map((array, index)=> <button key={index} className={'number nocursor ' +  (this.buttonColoring(array))}>{array}</button>);

    const currentNumbers= this.state.ticket;
    const pickedNumbers= currentNumbers.map((num, index) => <button key={index} className="numbersOnTicket">{num}</button>);
    
    const winner= this.state.winingText;
    const anouceWiner = winner.map((text, index) => <p key={index}>{text}</p>);
    return(
      <div>
        <div className="container">
          <div className="row">
          <div className="col border lightbackgroundcolor section-3">
            <h2>Winning numbers</h2>
            <p>{showArray}</p>
          </div>
          <div className="col border">
            <h2>Numbers</h2>
            <div className="pickNumber section-1">
            {listItems}
            </div>
          
          </div>
        </div>
        <div className="row">
          <div className="col flexBasis">
            <div className="tickets section-4">
            <ol>{listTickets}</ol>
            </div>
            <div className="bets">
            {showBet}
            </div>
          </div>
          <div className="col">
          <div className="clearfix">
            <div className="sideBy leftFloat">
	            <h3 className="font20">Selected number/s: </h3>
	            <p className="heightR">{pickedNumbers}</p>
            </div>
            <div className="sideBy">
	            <h4 className="font20">Place your bet here <i className="fas fa-arrow-down"></i></h4>
	            <input 
	            	className="inputBet"
	                onChange={this.addBet}
	                value={this.state.bet}
	              />
	             <p className="minMax">min: 1$ max: 1000$</p>
            </div>
           </div>
            <div className="section-2">
	            <button type="button" className="btn btn-dark" id={this.state.numberTicket === 5 ? 'no' : ''} onClick={this.addTicket}  >Add ticket</button>
	            <button type="button" className="btn btn-dark play" id={this.state.numberTicket === 5 ? 'yes' : ''} onClick={this.drawing}>Play</button>
            </div>

            <div className="notifications">
              <p className={this.state.constraint === true? '' : 'play'}>Only numbers!</p>
              <p className={this.state.emptyTicket === true? '' : 'play'}>Select number/s for a ticket!</p>
              <p className={this.state.noBets === true? '' : 'play'}>Place your bet!</p>
            </div>

            <div className="info">
            {anouceWiner}
            </div>
            <h3 className={this.state.startNew === true? '' : 'play'}>New game will start after 10 seconds...</h3>
          </div>
        </div>
      </div>
      </div>)
  }
}


export default App;
