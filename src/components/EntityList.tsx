type Entity = {
    id: number,
    name: string,
    owner_id: string,
    created_ad: string,
    type: string,
    address: string,
    additional_data: object
}
    

import {  Accessor,Setter, For, Show } from "solid-js";
import { A } from "@solidjs/router";


//Pass the entity list and store the current entity
export default function EntityList(props: { entities: Entity[] ,currentEntity:Accessor<Entity |null>, setEntity: Setter<Entity> }) {
    return (
        <Show
            when={props.entities.length >0}
            fallback={ <div class="" >There are no entities associated with this email</div>}
        >
            <For each={props.entities}>{(entity: Entity, i) => 
                <A href={entity == props.currentEntity() ? "#":entity.id.toString()}  class="" classList={{ active: entity == props.currentEntity() }} onclick={
                    function () {
                        if(entity == props.currentEntity()) return
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
