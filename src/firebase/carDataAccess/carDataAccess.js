import _ from "lodash";
import { toast } from "react-toastify";
import { carActionsType } from "../../redux/reducers/carsReducer/carActionTypes";
import history from "../../util/history";
import { firestore } from "../firebase.utils";

export const fetchCarsFromFirestore = () => async (dispatch) => {
  const data = await getAllCarsFromFirestore();

  dispatch({ type: carActionsType.GET_ALL_CARS, payload: data });
};

export const fetchSingleCarFromFirestore = (id) => async (dispatch) => {
  const data = await getSingleCarFromDatabase(id);

  dispatch({ type: carActionsType.FETCH_SINGLE_CAR, payload: data });
};

export const updateCarAvailability = (id) => async (dispatch) => {
  firestore.collection("cars").doc(id).update({
    available: false,
  });
  dispatch({ type: carActionsType.RETURN_CAR, payload: id });
};

///Connecting to firestore

export const addCarToFirestore = async ({
  model,
  maker,
  year,
  price,
  description,
  image,
}) => {
  firestore
    .collection("cars")
    .add({
      carMaker: maker,
      carModel: model,
      year,
      price,
      description,
      available: true,
      image: _.pick(image, "public_id", "url"),
    })
    .then(() => {
      toast.success("Car successfully created");
      history.push("CarsAdmin");
      // console.log("DocRef created with ID", docrRef.id);
    })
    .catch((error) => {
      console.log("Error creating car", error);
    });
};

const getSingleCarFromDatabase = async (id) => {
  const data = firestore.collection("cars").doc(id);

  //Thats for a single document
  const singleDoc = await data
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        return { id, ...doc.data() };
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  return singleDoc;
};

const getAllCarsFromFirestore = async () => {
  const allCars = [];

  await firestore
    .collection("cars")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let id = doc.id;
        allCars.push({ id, ...doc.data() });
        // all.push(doc.id, " => ", doc.data());
      });
      // console.log("all", all);
      return allCars;
    });
  // console.log("response", response);
  return allCars;
};
