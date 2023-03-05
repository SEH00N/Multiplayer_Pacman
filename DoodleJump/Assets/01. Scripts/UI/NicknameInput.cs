using UnityEngine;
using UnityEngine.UIElements;

public class NicknameInput : MonoBehaviour
{
    private UIDocument document = null;

    private VisualElement root = null;

    private void Awake()
    {
        document = GetComponent<UIDocument>();
    }

    private void OnEnable()
    {
        root = document.rootVisualElement;

        TextField nicknameInputField = root.Q<TextField>("nicknameInputField");
        nicknameInputField.RegisterCallback<KeyDownEvent>(e => {
            if(e.keyCode == KeyCode.Return)
            {
                if(nicknameInputField.value == "")
                    return;

                SendNicknameData("");
            }
        });

        Button submitBtn = root.Q<Button>("submitBtn");
        submitBtn.RegisterCallback<ClickEvent>(e => {
            if(nicknameInputField.value == "")
                return;

            SendNicknameData("");
        });
    }

    private void SendNicknameData(string nickname)
    {

    }
}
