function Car(props) {
  const classes = ["card"];
  if (props.car.marked) {
    classes.push("marked");
  }
  return (
    <div className={classes.join(" ")} onClick={props.onMark}>
      <div className="card-img">
        <img src={props.car.img} alt={props.car.name} />
      </div>
      <h3>{props.car.name}</h3>
      <p>{props.car.price} $</p>
    </div>
  );
}

class App extends React.Component {
  state = {
    cars: [
      {
        marked: false,
        name: "BMW M2 Coupe",
        price: 20000,
        img: "https://mochamanstyle.com/wp-content/uploads/2015/10/2016-BMW-M2-Coupe.jpg",
      },
      {
        marked: false,
        name: "Audi TT",
        price: 15000,
        img: "https://article.images.consumerreports.org/w_598,h_436/prod/content/dam/cro/news_articles/cars/2016-Audi-TT-pr-1-2016-598",
      },
      {
        marked: false,
        name: "Rolls Royce",
        price: 50000,
        img: "http://cdn-ds.com/stock/2017-Bentley-Continental-GT-V8-Coupe--Beverly-Hills-CA/seo/VAMP16966-SCBFT7ZA0HC061335/sz_108215/image-1.jpg",
      },
      {
        marked: false,
        name: "Mercedes amg coupe",
        price: 18000,
        img: "https://auto.ndtvimg.com/car-images/big/mercedes-amg/gle-coupe/mercedes-amg-gle-coupe.jpg?v=2",
      },
    ],
    visible: true,
  };

  handleClick(name) {
    const cars = this.state.cars.concat();

    const car = cars.find((p) => p.name === name);
    car.marked = !car.marked;

    this.setState({ cars: cars });
  }
  toggleHandler() {
    this.setState({ visible: !this.state.visible });
    console.log("Toggled !");
  }

  /*----Первый способ привязки обработчика---------------------------------------*/
  renderCars() {
    return this.state.cars.map((car) => {
      return (
        <Car
          car={car}
          key={car.name + Math.random()}
          onMark={this.handleClick.bind(this, car.name)}
        />
      );
    });
  }
  /*---end----------------------*/

  render() {
    /*---переключение hidden у контейнера -------------------------------------*/
    const classes = ["list"];

    if (!this.state.visible) {
      classes.push("hidden");
    } else {
      const index = classes.indexOf("hidden");
      if (index > -1) {
        classes.splice(index, 1);
      }
    }
    /*---end--------------------------------- */

    /*----2-й способ подключения обработчика. Динамический класс. ------------------------- */
    return (
      <div className="app">
        <button onClick={() => this.toggleHandler()}>Toggle</button>
        <hr />
        <div className={classes.join(" ")}>{this.renderCars()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
