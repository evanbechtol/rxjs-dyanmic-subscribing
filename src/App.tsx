import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Button from "./components/Button/button";
import { state } from "./store/sharedStateModule";
import { BehaviorSubject } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import Select from "./components/Select/Select";
import { Subscription } from "./types";

const initialSubscriptionState = {
  name: "Default",
  subscription: {},
  uid: uuidv4(),
};

function App() {
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [subscriptions, setSubscriptions] = useState([
    initialSubscriptionState,
  ] as Subscription[]);

  const subscribe = useCallback(
    (uid: string, newSub: BehaviorSubject<any>) => {
      const sub = newSub.subscribe();
      const subscriptionToAdd = {
        name: `subscriptions ${subscriptions.length + 1}`,
        uid,
        subscription: sub,
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
        unsubscribe(selectedSubscription);
      }, [selectedSubscription]),
      name: "unsubscribe",
      value: "unsubscribe",
    },
    updateState: {
      buttonText: "Update Selected State",
      disabled: false,
      handler: () => {
        // eslint-disable-next-line no-console
        console.log("calling update state");
        unsubscribe(selectedSubscription);
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

  function onSelectedSubscriptionChanged(value: string) {
    setSelectedSubscription(value);
  }

  return (
    <div className="App">
      <header className="App-header">
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
            name={btnAttrs.subscribe.name}
            buttonText={btnAttrs.subscribe.buttonText}
            disabled={btnAttrs.subscribe.disabled}
            handler={btnAttrs.subscribe.handler}
            value={btnAttrs.subscribe.value}
          />
        </div>
      </header>

      <div className="actions-container">
        <Button
          name={btnAttrs.updateState.name}
          buttonText={btnAttrs.updateState.buttonText}
          disabled={btnAttrs.updateState.disabled}
          handler={btnAttrs.updateState.handler}
          value={btnAttrs.updateState.value}
        />
      </div>
    </div>
  );
}

export default App;
