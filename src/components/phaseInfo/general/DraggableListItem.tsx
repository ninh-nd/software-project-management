import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Draggable } from "react-beautiful-dnd";
import { IPhaseCreate } from "~/interfaces/Entity";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type DraggableListItemProps = {
  item: IPhaseCreate;
  index: number;
  deletePhase: (index: number) => void;
  setPhases: Dispatch<SetStateAction<IPhaseCreate[]>>;
  items: IPhaseCreate[];
};

export default function DraggableListItem({
  item,
  index,
  deletePhase,
  setPhases,
  items,
}: DraggableListItemProps) {
  function updateName(e: ChangeEvent<HTMLInputElement>) {
    const newPhases = [...items];
    newPhases[index].name = e.target.value;
    setPhases(newPhases);
  }
  function updateDesc(e: ChangeEvent<HTMLInputElement>) {
    const newPhases = [...items];
    newPhases[index].description = e.target.value;
    setPhases(newPhases);
  }
  return (
    <Draggable draggableId={item.order.toString()} index={index}>
      {(provided) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={8}>
                  <Typography gutterBottom variant="h5" component="div">
                    Phase {index + 1}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ float: "right" }}
                    onClick={() => deletePhase(index)}
                  >
                    Delete phase
                  </Button>
                </Grid>
              </Grid>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                onChange={updateName}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                onChange={updateDesc}
              />
            </CardContent>
          </Card>
        </ListItem>
      )}
    </Draggable>
  );
}
