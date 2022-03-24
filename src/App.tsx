import React, { useCallback, useState } from "react";
import "./App.css";
import Button from "./components/Button/button";
import { state } from "./store/sharedStateModule";
import { BehaviorSubject } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import Select from "./components/Select/Select";
import { Subscription } from "./types";
import SelectedStateCard from "./components/SelectedStateCard/SelectedStateContainer";

const initialSubscriptionState = {
  name: "Default",
  state,
  uid: uuidv4(),
};

function App() {
  const [selectedSubscription, setSelectedSubscription] = useState(
    initialSubscriptionState
  );
  const [subscriptions, setSubscriptions] = useState([
    initialSubscriptionState,
  ] as Subscription[]);

  const [selectedState, setSelectedState] = useState(undefined);

  const subscribe = useCallback(
    (uid: string, newSub: BehaviorSubject<any>) => {
      const sub = newSub.subscribe((result) => {
        setSelectedState(result);
      });

      // eslint-disable-next-line no-console
      console.log(sub);
      const subscriptionToAdd = {
        name: `subscriptions ${subscriptions.length + 1}`,
        uid,
        state: sub,
      };

      setSubscriptions((prevState) => [...prevState, subscriptionToAdd]);
    },
    [subscriptions.length]
  );

  const btnAttrs = {
    subscribe: {
      buttonText: "Subscribe",
      disabled: false,
      handler: useCallback(() => {
        // eslint-disable-next-line no-console
        console.log("calling subscribe");
        subscribe(uuidv4(), state);
      }, [subscribe]),
      name: "subscribe",
      value: "subscribe",
    },
    unsubscribe: {
      buttonText: "Unsubscribe",
      disabled: false,
      handler: useCallback(() => {
        // eslint-disable-next-line no-console
        console.log("calling unsubscribe");
        unsubscribe(selectedSubscription.uid);
      }, [selectedSubscription]),
      name: "unsubscribe",
      value: "unsubscribe",
    },
    updateState: {
      buttonText: "Update Selected State",
      disabled: selectedState === undefined,
      handler: () => {
        // eslint-disable-next-line no-console
        console.log("calling update state");
        updateSelectedState(selectedSubscription.uid);
      },
      name: "update selected state",
      value: "update selected state",
    },
  };

  function unsubscribe(uid: string) {
    setSubscriptions((prevState) =>
      prevState.filter((sub: Subscription) => sub.uid !== uid)
    );
  }

  function updateSelectedState(uid: string) {
    const subscriptionToUpdate = subscriptions.find((sub) => sub.uid === uid);
    const newDataForState = {
      user: {
        name: "Evan",
        age: "32",
        country: "USA",
        gender: "Male",
        id: uuidv4(),
      },
      appId: uuidv4(),
    };

    if (subscriptionToUpdate) {
      subscriptionToUpdate?.state?.next(newDataForState);
    }
  }

  function onSelectedSubscriptionChanged(value: string) {
    const sub = subscriptions.filter((elem) => elem.uid === value)[0];
    setSelectedSubscription(sub);
  }

  return (
    <div className="App">
      <header className="App-header">
        <SelectedStateCard
          selectedSubscription={selectedSubscription}
          selectedState={selectedState}
        />

        <Select
          subscriptions={subscriptions}
          onSelect={onSelectedSubscriptionChanged}
        />

        <div className="btn-container">
          <Button
            name={btnAttrs.unsubscribe.name}
            buttonText={btnAttrs.unsubscribe.buttonText}
            disabled={btnAttrs.unsubscribe.disabled}
            handler={btnAttrs.unsubscribe.handler}
            value={btnAttrs.unsubscribe.value}
          />

          <Button
            name={btnAttrs.updateState.name}
            buttonText={btnAttrs.updateState.buttonText}
            disabled={btnAttrs.updateState.disabled}
            handler={btnAttrs.updateState.handler}
            value={btnAttrs.updateState.value}
          />

          <Button
            name={btnAttrs.subscribe.name}
            buttonText={btnAttrs.subscribe.buttonText}
            disabled={btnAttrs.subscribe.disabled}
            handler={btnAttrs.subscribe.handler}
            value={btnAttrs.subscribe.value}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
