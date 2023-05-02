type Entity = {
    id: number,
    name: string,
    owner_id: string,
    created_at: string,
    type: string,
    address: string,
    additional_data: object
}
    

import {  Accessor,Setter, For, Show } from "solid-js";
import { A } from "@solidjs/router";


//Pass the entity list and store the current entity
export default function EntityList(props: { entities: Entity[] |null ,currentEntity:Entity|null, setEntity: Setter<Entity> }) {
    return (
        <Show
            when={props.entities != null && props.entities.length >0}
            fallback={ <div class="" >There are no entities associated with this email</div>}
        >
            <For each={props.entities}>{(entity: Entity, i) => 
                <A href={entity == props.currentEntity ? "#": "/"+entity.type.toLowerCase() + "/"+entity.id.toString()}  class="" classList={{ active: entity == props.currentEntity }} onclick={
                    function () {
                        if(props.currentEntity == null) return
                        if(entity == props.currentEntity){ return}
                        props.setEntity(entity)
                    }
                }
                >
                    <p class="">{entity.name}</p>
                    <p class="">{entity.type}</p>
                </A>
            }
                    
            </For>
        </Show>
 )           
}
