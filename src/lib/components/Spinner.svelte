<script>
    export let visible = false;
    export let caption = "";
    export let height = "160px";
    export let width = "160px";
    
    let minWidth = "80px";
</script>

{#if visible === true}
    <div style="height:{height};width:{width};min-width:{minWidth};" class="container centered">
        <h2 class="caption">{caption}</h2>
        <div class="spinner"/>
    </div>
{/if}

<style>
    .centered{
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right: 0;
        margin: auto;
    }
    .caption{
        white-space: nowrap;
        width: auto;
        text-align: left;
        margin: auto;
        margin-left: -32px;
        margin-bottom: 0.5rem;
    }
    .spinner{
        visibility: visible;
        width: 80px;
        height: 80px;

        border: 2px solid #f3f3f3;
        border-top:3px solid #f25a41;
        border-radius: 100%;

        animation: spin 1s infinite linear;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        } to {
            transform: rotate(360deg);
        }
    }
</style>