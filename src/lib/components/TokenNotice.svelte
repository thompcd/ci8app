<script lang="ts">
import { getClient } from '$lib/data/inventoryClient';

const api = getClient();
var link = api.tokenUrl as string;

</script>

<h3>You may need a new access token.</h3>
<p>Follow the link to grab a new grant id needed to generate an access token</p>
<a 
target="_blank" 
href={link}
>Click to request new authorization code, use operations login</a>