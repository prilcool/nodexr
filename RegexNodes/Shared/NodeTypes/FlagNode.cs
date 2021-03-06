﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegexNodes.Shared.NodeTypes
{
    public class FlagNode : Node
    {
        public override string Title => "Flags";
        public override string NodeInfo => "Inserts flags that change the way the Regex is interpreted.\nEach flag can either be ignored (default), applied (✓), or removed (−).\nLeave the 'Contents' input empty to have the flags apply to everything that comes after them in the Regex, or connect a node to this input so that only that portion of the Regex has the flags applied.";

        [NodeInput]
        protected InputProcedural InputContents { get; } = new InputProcedural() { Title = "(Optional) Contents" };
        [NodeInput]
        protected InputCheckboxNullable OptionIgnoreCase { get; } = new InputCheckboxNullable() { Title = "Case Insensitive" };
        [NodeInput]
        protected InputCheckboxNullable OptionMultiline { get; } = new InputCheckboxNullable() { Title = "Multiline" };
        [NodeInput]
        protected InputCheckboxNullable OptionSingleline { get; } = new InputCheckboxNullable() { Title = "Singleline" };
        [NodeInput]
        protected InputCheckboxNullable OptionExplicitCapture { get; } = new InputCheckboxNullable() { Title = "Explicit Capture" };
        [NodeInput]
        protected InputCheckboxNullable OptionIgnoreWhitespace { get; } = new InputCheckboxNullable() { Title = "Ignore Whitespace" };

        public override string GetValue()
        {
            string input = "" + InputContents.GetValue().RemoveNonCapturingGroup();
            if (!String.IsNullOrEmpty(input))
            {
                input = ":" + input;
            }

            string flagsOn = "";
            flagsOn += OptionIgnoreCase.CheckedState == 1 ? "i" : "";
            flagsOn += OptionMultiline.CheckedState == 1 ? "m" : "";
            flagsOn += OptionSingleline.CheckedState == 1 ? "s" : "";
            flagsOn += OptionExplicitCapture.CheckedState == 1 ? "n" : "";
            flagsOn += OptionIgnoreWhitespace.CheckedState == 1 ? "x" : "";

            string flagsOff = "";
            flagsOff += OptionIgnoreCase.CheckedState == -1 ? "i" : "";
            flagsOff += OptionMultiline.CheckedState == -1 ? "m" : "";
            flagsOff += OptionSingleline.CheckedState == -1 ? "s" : "";
            flagsOff += OptionExplicitCapture.CheckedState == -1 ? "n" : "";
            flagsOff += OptionIgnoreWhitespace.CheckedState == -1 ? "x" : "";
            if (!String.IsNullOrEmpty(flagsOff))
            {
                flagsOff = "-" + flagsOff;
            }

            return UpdateCache($"(?{flagsOn}{flagsOff}{input})");
        }
    }
}
