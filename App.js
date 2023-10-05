import * as React from 'react';
import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import evaluateExpression from './evaluateExpression';
import TextChangeSize from './textChangeSize';

export default class App extends Component {
  state = {
    expression: '',
    output: '0',
    color: 'white',
    position: 'flex-end',
    marginButtom: 20,
    first: true,
  };
  evalExpression = () => {
    let exp1 = this.state.expression;
    if (this.state.first && exp1 != '') {
      let exp2 = exp1.replace(/%/g, '*(1/100)');
      let exp3 = exp2.replace(/÷/g, '/');
      let exp4 = exp3.replace(/×/g, '*');
      let exp5 = exp4.replace(/,/g, '.');
      let r;
      try {
        r = evaluateExpression(exp5);
      } catch (error) {
        r = 'NaN';
      }
      this.setState({ output: r.toString() });
      this.setState({ color: 'orange' });
      this.setState({ expression: '' });
      this.setState({ position: 'center' });
      this.setState({ marginButtom: 40 });
      this.setState({ first: false });
    } else {
      this.clear();
    }
  };
  writeExpression = (input) => {
    this.setState({ color: 'white' });
    this.setState({ position: 'flex-end' });
    this.setState({ marginButtom: 20 });
    this.setState({ first: true });
    let ex = this.state.expression;
    let n = ex.length-1;
    const operat = ["×", ",", "+", "-", "÷"];
    if (operat.includes(input) && operat.includes(ex[n])) {
      ex2 = ex.slice(0, -1) + input;
      this.setState({ expression: ex2 });
    } else {
      let newExpression = ex + input;
      this.setState({ expression: newExpression });
      let expr2 = newExpression.replace(/%/g, '*(1/100)');
      let expr3 = expr2.replace(/÷/g, '/');
      let expr4 = expr3.replace(/×/g, '*');
      let expr5 = expr4.replace(/,/g, '.');
      let r;
      try {
        r = evaluateExpression(expr5);
      } catch (error) {
        if (operat.includes(newExpression[newExpression.length-1])) {
          r = 0;
        } else {
          r = 'NaN';
        }
      }
      this.setState({ output: r.toString() });
    }
  };
  clear = () => {
    this.setState({ expression: '' });
    this.setState({ output: '0' });
    this.setState({ color: 'white' });
    this.setState({ position: 'flex-end' });
    this.setState({ marginButtom: 20 });
    this.setState({ first: true });
  };
  removeOneLetter = () => {
    const operat = ["×", ",", "+", "-", "÷"];
    const expR0 = this.state.expression;
    if (expR0.length != 0 && expR0.length != 1) {
      const expR1 = expR0.slice(0, expR0.length - 1);
      this.setState({ expression: expR1 });
      let n = expR1.length-1
      if (operat.includes(expR1[n])) {
        let expR2 = expR1.slice(0, -1).replace(/%/g, '*(1/100)');
        let expR3 = expR2.replace(/÷/g, '/');
        let expR4 = expR3.replace(/×/g, '*');
        let expR5 = expR4.replace(/,/g, '.');
        let rR;
        try {
          rR = evaluateExpression(expR5);
        } catch (error) {
          rR = 'NaN';
        }
        this.setState({ output: rR.toString() });
      } else {
        let expR2 = expR1.replace(/%/g, '*(1/100)');
        let expR3 = expR2.replace(/÷/g, '/');
        let expR4 = expR3.replace(/×/g, '*');
        let expR5 = expR4.replace(/,/g, '.');
        let rR;
        try {
          rR = evaluateExpression(expR5);
        } catch (error) {
          rR = 'NaN';
        }
        this.setState({ output: rR.toString() });
      }
      this.setState({ color: 'white' });
      this.setState({ position: 'flex-end' });
      this.setState({ marginButtom: 20 });
      this.setState({ first: true });
    } else {
      this.clear();
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultBox}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{alignSelf: 'center'}}>
            <TextChangeSize text={this.state.expression} color='white' />
          </ScrollView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ alignSelf: this.state.position, marginTop: 30, marginBottom: this.state.marginButtom, padding: 10 }}>
            <TextChangeSize text={this.state.output} color={this.state.color} />
          </ScrollView>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', margin:20}}>
          <View style={{borderWidth: 3, borderColor: 'white', textAlign: 'center', width: 60,}}></View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback onPress={this.clear}>
              <View style={[styles.button, styles.grey]}>
                <Text style={[styles.buttonText, styles.colorBlack]}>AC</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.buttonView}>
            <TouchableWithoutFeedback onPress={this.removeOneLetter}>
              <View style={[styles.button, styles.grey]}>
                <Text style={[styles.buttonText, styles.colorBlack]}>C</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('%');
              }}>
              <View style={[styles.button, styles.grey]}>
                <Text style={[styles.buttonText, styles.colorBlack]}>%</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('÷');
              }}>
              <View style={[styles.button, styles.orange]}>
                <Text style={styles.buttonText}>÷</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('7');
              }}>
              <View style={[styles.button, styles.black]}>
                <Text style={styles.buttonText}>7</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('8');
              }}>
              <View style={[styles.button, styles.black]}>
                <Text style={styles.buttonText}>8</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('9');
              }}>
              <View style={[styles.button, styles.black]}>
                <Text style={styles.buttonText}>9</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('×');
              }}>
              <View style={[styles.button, styles.orange]}>
                <Text style={styles.buttonText}>×</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('4');
              }}>
              <View style={[styles.button, styles.black]}>
                <Text style={styles.buttonText}>4</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('5');
              }}>
              <View style={[styles.button, styles.black]}>
                <Text style={styles.buttonText}>5</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('6');
              }}>
              <View style={[styles.button, styles.black]}>
                <Text style={styles.buttonText}>6</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('-');
              }}>
              <View style={[styles.button, styles.orange]}>
                <Text style={styles.buttonText}>-</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('1');
              }}>
              <View style={[styles.button, styles.black]}>
                <Text style={styles.buttonText}>1</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('2');
              }}>
              <View style={[styles.button, styles.black]}>
                <Text style={styles.buttonText}>2</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('3');
              }}>
              <View style={[styles.button, styles.black]}>
                <Text style={styles.buttonText}>3</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('+');
              }}>
              <View style={[styles.button, styles.orange]}>
                <Text style={styles.buttonText}>+</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 2 }}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression('0');
              }}>
              <View style={[styles.button0, styles.black]}>
                <Text style={styles.buttonText}>0</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.writeExpression(',');
              }}>
              <View style={[styles.button, styles.black]}>
                <Text style={styles.buttonText}>,</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonView}>
            <TouchableWithoutFeedback onPress={this.evalExpression}>
              <View style={[styles.button, styles.orange]}>
                <Text style={styles.buttonText}>=</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    padding: 10,
    paddingButtom: 2,
  },
  resultBox: {
    padding: 0,
  },
  button: {
    height: 70,
    width: 70,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    marginTop: 6,
  },
  grey: {
    backgroundColor: 'grey',
  },
  orange: {
    backgroundColor: 'orange',
  },
  black: {
    backgroundColor: 'rgba(57, 55, 49, 0.88)',
  },
  button0: {
    height: 70,
    width: 152,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    marginTop: 6,
  },
  buttonText: {
    margin: 5,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  colorBlack: {
    color: 'black',
  },
  buttonView: {
    flex: 1,
  },
});
