import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { useState } from "react";

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }
  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText("");
  }
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
      
    
        <TextInput
          style={styles.textInput}
          placeholder="Enter your goal"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#b180f0" />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",

    color: "#cccccc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    marginBottom: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "#cccccc",
    marginRight: 8,
    padding: 16,
    backgroundColor: "#e4d0ff",

    borderColor: "#e4d0ff",
    color: "#120480",
    borderRadius: 6,
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
});
