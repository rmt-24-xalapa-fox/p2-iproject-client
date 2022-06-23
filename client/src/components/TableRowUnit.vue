<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    name: "TableRowUnit",
    props: ["unit", "i"],
    methods: {
        ...mapActions(useCounterStore, ["fetchRentalanById", "hitStripe", "bookedUnit"]),

        submit(id) {
            this.hitStripe()
            this.bookedUnit(id)
        }
    },

}
</script>

<template>
    <tr>
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ unit.psType }}</td>
        <td class="btn-outline-success">{{ unit.status }}</td>
        <td>
            <button v-if="unit.status !== 'Booked'" class="btn btn-success" @click="submit(unit.id)"
                type="submit">Book</button>
        </td>

    </tr>
</template>