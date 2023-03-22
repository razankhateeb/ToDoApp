import { StatusBar } from "expo-status-bar";

import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function ModalVisibility() {
    setModalIsVisible(true);
  }

  function endModalHandler() {
    setModalIsVisible(false);
  }
  function addGoalHandler(enteredGoalText) {
    //if using scroll view
    // setCourseGoals((currentCourseGoals)=>[...currentCourseGoals,enteredGoalText]);
    //if using flat list
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endModalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id != id);
    });
  }

  return (
    <>
      <StatusBar style="light" />

      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color={"#a065ec"}
          onPress={ModalVisibility}
        />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endModalHandler}
        />
        <View style={styles.goalsContainer}>
          {/* all items are rendered even those not appearing at the moment this causes performance issues this is why its better to use flatlist as it will 
   render items lazily upon  need and has a small threshold to preload */}

          {/* <ScrollView >
        {courseGoals.map((goal)=>(
          <View key={goal} style={styles.goalItem}>
        <Text style={styles.goalText}>{goal}</Text> 
        </View>
        ))} 
      </ScrollView> */}

          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            //if data coming from api has key and we want to autogenerate our own we can use key extractor
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },

  goalsContainer: {
    flex: 5,
  },
});
